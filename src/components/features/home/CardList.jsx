import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 메인 페이지에 들어갈 컴포넌트
// LinkDiv 테스트용
function CardList() {
  return (
    <DiaryBox>
      <h3>일기리스트</h3>
      <LinkDiv>
        <Link to="/write" className="datail">
          <span>일기쓰기</span>
        </Link>
      </LinkDiv>
      <LinkDiv>
        <Link to="/details" className="datail">
          <span>일기 상세보기(일기 카드)</span>
        </Link>
      </LinkDiv>
    </DiaryBox>
  );
}
// 이 DiaryBox 컴포넌트 안에 일기 리스트들, 일기쓰기 버튼, 삭제하기 버튼 넣기
// 일기리스트 저 글자는 임의로 적은 것임

export default CardList;

const DiaryBox = styled.div`
  //여기에 스타일 지정
`;

const LinkDiv = styled.div`
  display: block;
  margin: 10px 0 0 20px;
  font-size: 16px;
  a {
    color: #949393;
    text-decoration: none;
  }
`;
