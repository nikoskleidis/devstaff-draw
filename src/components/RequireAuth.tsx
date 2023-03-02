import { Button, PasswordInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { authenticate } from '../api';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 200px;

  & > * {
    width: 100%;
  }
`;

type Props = {
  children: ReactNode;
};

const RequireAuth = ({ children }: Props) => {
  const { register, handleSubmit, reset } = useForm<{ password: string }>({
    defaultValues: { password: '' }
  });
  const { mutate, isLoading, isSuccess } = useMutation(authenticate, {
    onError: () => reset()
  });

  if (isSuccess) {
    return <>{children}</>;
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Wrapper>
        <Form onSubmit={handleSubmit(({ password }) => mutate(password))}>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            disabled={isLoading}
            {...register('password', { required: true })}
          />
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default RequireAuth;
