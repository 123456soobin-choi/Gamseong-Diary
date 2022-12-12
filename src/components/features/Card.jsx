import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//디테일 페이지에 들어갈 컴포넌트
const Card = () => {
  return (
    <DiaryDetail>
      <h3>일기 상세 페이지</h3>
      <LinkDiv>
        <Link to={`/`} className="datail">
          <span>일기장으로 돌아가기</span>
        </Link>
      </LinkDiv>
    </DiaryDetail>
  );
};
//이 DiaryBox 컴포넌트 안에 일기 리스트들, 일기쓰기 버튼, 삭제하기 버튼 넣기
//일기리스트 저 글자는 임의로 적은 것임

export default Card;

const DiaryDetail = styled.div`
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
