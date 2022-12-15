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
// 댓글 가져오기
export const getComment = createAsyncThunk('comments/getcomment', async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3001/comments?detailId=${payload.detailId}`); // data 상수는 get 요청을 하겠다! 라는 뜻 자체
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// ? 뒤에 붙는 게 querystring임
// https://www.google.com/search?q=검색어 이런 방식 get요청을 q 이렇게 하는 것
// http 통신방식 & axios 공부(비동기 통신 함수)

// 댓글 추가하기
export const postComment = createAsyncThunk('comments/postcomment', async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`http://localhost:3001/comments`, payload); // url뒤에 querystring 으로도 보낼 수 있고 request 로도 보낼 수 있음
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 댓글 삭제하기
export const deleteComment = createAsyncThunk('comments/deletecomment', async (id, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/comments/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 댓글 수정하기
export const patchComment = createAsyncThunk(
  'comment/patchcomment',

  async (payload, thunkAPI) => {
    try {
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.patch(`http://localhost:3001/comments/${payload.id}`, {
        comment: payload.comment,
      });
      console.log(payload);
      // console.log('DB.JSON', data);

      return thunkAPI.fulfillWithValue(data.data);
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
    [postComment.pending]: (state) => {
      state.isLoading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    },
    [postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 삭제하기
    [deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.comments = state.comments.filter((item) => item.id !== action.payload);
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 수정하기
    [patchComment.pending]: (state) => {
      state.isLoading = true;
    },
    [patchComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.comments = state.comments.filter((item) => item.id !== action.payload);
      console.log(action.payload);
    },
    [patchComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Action Creator 는 컴포넌트에서 사용하기 위해 export
// export const {} = commentSlice.actions;
// reducer 는 configStore 에 등록하기 위해 export
export default commentSlice.reducer;
