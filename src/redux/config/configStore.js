import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import comments from '../modules/commentSlice';
import diary from '../modules/diarySlice';
// Slice 모듈이 여러 개인 경우 추가할 때마다 reduce 안에 넣어줘야 함

const store = configureStore({
  reducer: { comments, diary },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
