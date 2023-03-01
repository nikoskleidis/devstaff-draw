import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
`;

const Main = styled.main`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 20px;
  background: gray;
`;

const Footer = styled.div`
  height: 20px;
  background: gray;
`;

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />

      <Main>{children}</Main>

      <Footer />
    </Wrapper>
  );
};

export default Layout;
