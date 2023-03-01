import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {Colors} from "@/src/constants";


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
  padding: 10px 15px;
  background: ${Colors.headerBg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 22px;
  color: ${Colors.grey};
`

const Footer = styled.div`
  height: 20px;
  background: gray;
`;


const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
        <Header>
            <Image src='/devstaff-logo.webp' alt='Devstaff logo' width={90} height={50} />
            <Title>DevStaff Draw</Title>
        </Header>

      <Main>{children}</Main>

      <Footer />
    </Wrapper>
  );
};

export default Layout;
