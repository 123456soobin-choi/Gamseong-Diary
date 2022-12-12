import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <div>
      <StyledHeader>
        {/* <div className="logoBox">
          <img className="logo" src={로고 나중에 추가} alt="logo" />
        </div> */}
        <h1>감성 한 방울</h1>
      </StyledHeader>
    </div>
  );
};

export default Header;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solied #333; //임의 값
`;
