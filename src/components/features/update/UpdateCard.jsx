import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { updateDiary } from '../../../redux/modules/diarySlice';

// 일기수정 페이지에 들어갈 컴포넌트
function UpdateCard() {
  //   const [title, setTitle] = useState('');
  //   const [content, setContent] = useState('');

  // patch에서 사용할 제목, 컨텐츠값의 state 추가
  const detail = useSelector((state) => state.diary.detail);
  console.log('다시쓰기 선택 시 불러오는 값', detail);
  const [editTitle, setEditTitle] = useState(detail.title);
  const [editContent, setEditContent] = useState(detail.content);
  // console.log('디테일아이디', detailId);

  const { id } = useParams();

  const dispatch = useDispatch();

  const onEditHandler = () => {
    const editDiary = { id, editTitle, editContent };
    if (editTitle === '' || editContent === '') {
      alert('제목과 타이틀을 모두 작성해주세요.');
    } else {
      dispatch(updateDiary(editDiary));
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
        <Link to={`/details/${id}`} className="datail">
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
          value={editTitle}
          onChange={(event) => {
            console.dir(event);
            setEditTitle(event.target.value);
          }}
        />
        <textarea
          value={editContent}
          onChange={(event) => {
            setEditContent(event.target.value);
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
