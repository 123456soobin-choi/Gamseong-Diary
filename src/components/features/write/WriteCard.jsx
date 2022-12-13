import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CKEditor } from 'ckeditor4-react';

// 일기쓰기/수정 페이지에 들어갈 컴포넌트
// LinkDiv 테스트용
function CardList() {
  return (
    <DiaryWrite>
      <h3>일기 쓰기/수정</h3>
      <LinkDiv>
        <Link to="/" className="datail">
          <span>일기 그만쓰기</span>
        </Link>
        <button type="submit">일기 저장</button>
      </LinkDiv>
      <StInputContainer>
        <StInput type="text" placeholder="제목을 작성해주세요." />
        <CKEditor
          onInstanceReady={() => {
            console.log('Editor is ready!');
          }}
        />
      </StInputContainer>
    </DiaryWrite>
  );
}
// 이 DiaryBox 컴포넌트 안에 일기 리스트들, 일기쓰기 버튼, 삭제하기 버튼 넣기
// 일기리스트 저 글자는 임의로 적은 것임

export default CardList;

const DiaryWrite = styled.div`
  //여기에 스타일 지정
`;

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

const StInput = styled.input`
  border: none;
  padding: 20px;
`;
