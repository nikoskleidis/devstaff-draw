import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Colors } from '@/src/constants';

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
  padding: 15px;
  background: ${Colors.headerBg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 22px;
  color: ${Colors.grey};
`;

const Footer = styled.div`
  background: ${Colors.headerBg};
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Website = styled.a`
  text-decoration: none;
  padding-top: 12px;
  color: ${Colors.grey};
`;

const Social = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header>
        <Image src="/devstaff-logo.webp" alt="Devstaff logo" width={90} height={50} />
        <Title>DevStaff Draw</Title>
      </Header>

      <Main>{children}</Main>

      <Footer>
        <Social>
          <a href="https://github.com/devstaff-crete/DevStaff-Heraklion" target="_blank" rel="noreferrer">
            <Image alt="github" height="32" width="32" src="https://cdn.simpleicons.org/github/6D6E71" />
          </a>
          <a href="http://meetup.com/devstaff" target="_blank" rel="noreferrer">
            <Image alt="meetup" height="42" width="42" src="https://cdn.simpleicons.org/meetup/6D6E71" />
          </a>
          <a href="https://www.facebook.com/Devstaff" target="_blank" rel="noreferrer">
            <Image alt="facebook" height="32" width="32" src="https://cdn.simpleicons.org/facebook/6D6E71" />
          </a>
          <a href="https://twitter.com/devstaff_gr" target="_blank" rel="noreferrer">
            <Image alt="twitter" height="32" width="32" src="https://cdn.simpleicons.org/twitter/6D6E71" />
          </a>
          <a href="https://www.linkedin.com/company/devstaff" target="_blank" rel="noreferrer">
            <Image alt="meetup" height="32" width="32" src="https://cdn.simpleicons.org/linkedin/6D6E71" />
          </a>
        </Social>
        <Website href="https://devstaff.gr" target="_blank" rel="noreferrer">
          www.devstaff.gr
        </Website>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
