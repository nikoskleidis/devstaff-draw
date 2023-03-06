import Link from 'next/link';
import Layout from '@/src/components/Layout';
import styled, { css } from 'styled-components';
import { Colors } from '@/src/constants';

const Button = styled.button<{ buttonType: 'primary' | 'secondary' }>`
  width: 90vw;
  max-width: 400px;
  border-radius: 10px;
  border: 0;
  height: 100px;
  font-weight: bold;
  font-size: 22px;
  color: white;
  cursor: pointer;
  background-color: ${({ buttonType }) =>
    buttonType === 'primary' ? Colors.colorPrimary : Colors.colorSecondary};
  ${props =>
    props.buttonType === 'primary' &&
    css`
      margin-bottom: 5px;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <Layout>
      <Wrapper>
        <Link href="/participate">
          <Button buttonType="primary">Participate</Button>
        </Link>
        <Link href="/listing">
          <Button buttonType="secondary">List</Button>
        </Link>
      </Wrapper>
    </Layout>
  );
};

export default Home;
