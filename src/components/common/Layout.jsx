import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;

//component 형태로 만들고 export
const StyledLayout = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 1200px;
  min-width: 800px;
  background-color: #fff;
`;
