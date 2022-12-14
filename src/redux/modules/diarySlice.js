// src/redux/modules/counterSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import nextId from 'react-id-generator';

const initialState = {
  diary: [
    {
      id: 1,
      title: 'diary',
      content: 'write diary',
    },
  ],
  isLoading: false,
  error: null,
};

export const getDiary = createAsyncThunk(
  'diary/getDiary', // 액션 밸류의 이름
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get('http://localhost:3001/diary'); // data 상수는 get 요청을 하겠다! 라는 뜻 자체를 담고있다.
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data); // promise에서 네트워크 요청이 성공한 경우 dispatch하고, 인자로는 payload가 들어간다.
      // (!!! 디스패치는 액션과 페이로드를 리듀서에게 전달하는 과정이다!!!)
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error); // promise에서 네트워크 요청이 실패한 경우, 원하는 값을 리턴해주고, 여기서는 리턴하는 인자로 catch에서 주는 error를 리턴하게 만들었다.
    }
  },
);

export const postDiary = createAsyncThunk('diary/postDiary', async (newDiary, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/diary', newDiary);
    console.log(response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: {
    // thunk 함수를 사용하는 경우엔 일반 리듀서가 아니라 extraReducers가 필요하다. 진행중, 성공, 실패 케이스에 대해서 리듀서를 만든다.
    [getDiary.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다. (initialState, 즉 state의 상태값이기 때문에 state.isLoading)
    },
    [getDiary.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.diary = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      // action의 payload를 initalState에 있는 todoes에 넣는다. action.payload는 변경된 행동(action)의 값(payload = 변경된값)을 의미한다.
    },
    [getDiary.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [postDiary.fulfilled]: (state, action) => {
      state.diary = { diary: [...state.diary, action.payload] };
    },
    [postDiary.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { diary } = diarySlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default diarySlice.reducer;
