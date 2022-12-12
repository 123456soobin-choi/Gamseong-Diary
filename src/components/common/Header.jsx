import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';

function Header() {
  return (
    <div>
      <StyledHeader>
        <img className="logo" src={Logo} alt="logo" />
        <h1>감성 일기</h1>
      </StyledHeader>
    </div>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0 20px 0;
  background-color: #fff; // 테스트

  .logo {
    height: 30px;
    margin-right: 10px;
  }

  h1 {
    font-size: 26px;
  }
`;
export default Header;
