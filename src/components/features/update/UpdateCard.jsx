import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { updateDiary } from '../../../redux/modules/diarySlice';

// 일기수정 페이지에 들어갈 컴포넌트
function UpdateCard() {
  //   const [title, setTitle] = useState('');
  //   const [content, setContent] = useState('');

  // patch에서 사용할 제목, 컨텐츠값의 state 추가
  const [editTitle, setEditTitle] = useState({ title: '' });
  const [editContent, setEditContent] = useState({ content: '' });
  const detailId = useSelector((state) => state.diary.detail);

  const dispatch = useDispatch();

  const onEditHandler = (event) => {
    event.preventDefault();
    const editDiary = { editTitle, editContent };
    if (editTitle === '' || editContent === '') {
      alert('제목과 타이틀을 모두 작성해주세요.');
    } else {
      dispatch(updateDiary(editDiary));
      setEditTitle('');
      setEditContent('');
    }
  };

  return (
    <DiaryWrite>
      <h2
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        일기 작성
      </h2>
      <LinkDiv>
        <Link to={`/details/${detailId.id}`} className="datail">
          <span>그만쓰기</span>
        </Link>
        <Button type="submit" color="rgb(78, 183, 164)" onClick={onEditHandler}>
          저장
        </Button>
      </LinkDiv>
      <StInputContainer>
        <Input
          id="title"
          name="DiaryTitle"
          label="제목"
          value={detailId.title}
          onChange={(event) => {
            setEditTitle({ editTitle: event.target.value });
          }}
        />
        <textarea
          value={detailId.content}
          onChange={(event) => {
            setEditContent({ editContent: event.target.value });
            console.log(event);
          }}
        />
      </StInputContainer>
    </DiaryWrite>
  );
}

export default UpdateCard;

const DiaryWrite = styled.div``;

const LinkDiv = styled.div`
  display: flex;
  margin: auto;
  font-size: 16px;
  a {
    color: #949393;
    text-decoration: none;
  }
  justify-content: space-between;
`;

const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  padding: 100px 100px 100px 100px;
`;
