import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//일기쓰기/수정 페이지에 들어갈 컴포넌트
//LinkDiv 테스트용
const CardList = () => {
  return (
    <DiaryWrite>
      <h3>일기 쓰기/수정</h3>
      <LinkDiv>
        <Link to={`/`} className="datail">
          <span>일기 그만쓰기</span>
        </Link>
      </LinkDiv>
    </DiaryWrite>
  );
};
//이 DiaryBox 컴포넌트 안에 일기 리스트들, 일기쓰기 버튼, 삭제하기 버튼 넣기
//일기리스트 저 글자는 임의로 적은 것임

export default CardList;

const DiaryWrite = styled.div`
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
