/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기 상태 값
const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

// thunk 함수
export const getComment = createAsyncThunk('comments/getcomment', async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`http://localhost:3001/comments`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postComment = createAsyncThunk('comments/postcomment', async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:3001/comments`, payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// export const deleteComment = createAsyncThunk('diary/deleteDiary', async (itemId, { dispatch }) => {
//   try {
//     const response = await axios.delete(`http://localhost:3001/diary/${itemId}`);
//     // console.log(response);
//     dispatch(getComment());
//   } catch (error) {
//     console.log(error);
//   }
// });

export const deleteComment = createAsyncThunk(
  'comments/deletecomment',
  async (payload, thunkAPI) => {
    // console.log('실험', payload);
    try {
      await axios.delete(`http://localhost:3001/comments/${payload}`);
      const response = await axios.get(`http://localhost:3001/comments`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// createSlice API
export const commentSlice = createSlice({
  name: 'comments', // 저장소의 이름
  initialState,
  reducers: {},
  extraReducers: {
    // 댓글 가져오기
    [getComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload; // Store에 있는 comments에 서버에서 가져온 comments를 넣습니다.
    },
    [getComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 댓글 추가하기
    // [postComment.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    [postComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments.push(action.payload);
      // state.comments = action.payload; // Store에 있는 comments에 서버에서 가져온 comments를 넣습니다.
    },
    [postComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.comments = state.comments.filter((item) => item.id !== action.payload);
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Action Creator 는 컴포넌트에서 사용하기 위해 export
// export const {} = commentSlice.actions;
// reducer 는 configStore 에 등록하기 위해 export
export default commentSlice.reducer;
