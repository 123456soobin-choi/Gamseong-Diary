import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import nextId from 'react-id-generator';
import { useDispatch } from 'react-redux';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { postDiary } from '../../../redux/modules/diarySlice';

// 일기쓰기/수정 페이지에 들어갈 컴포넌트
// LinkDiv 테스트용
function WriteCard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newDiary = { title, content };
    if (title === '' || content === '') {
      alert('제목과 타이틀을 모두 작성해주세요.');
    } else {
      dispatch(postDiary(newDiary));
      setTitle('');
      setContent('');
      window.location.replace('/');
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
        <Link to="/" className="datail">
          <span>그만쓰기</span>
        </Link>
        <Button type="submit" color="rgb(78, 183, 164)" onClick={onSubmitHandler}>
          저장
        </Button>
      </LinkDiv>
      <StInputContainer>
        <Input
          id="title"
          name="DiaryTitle"
          label="제목"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
      </StInputContainer>
    </DiaryWrite>
  );
}
// 이 DiaryBox 컴포넌트 안에 일기 리스트들, 일기쓰기 버튼, 삭제하기 버튼 넣기
// 일기리스트 저 글자는 임의로 적은 것임

export default WriteCard;

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
