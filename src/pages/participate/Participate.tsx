import { Button, Stack, TextInput } from '@mantine/core';
import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { registerNewParticipant } from '@/src/api';
import { useForm } from 'react-hook-form';
import { NewParticipant } from '@/src/types';
import { Colors, emailRegex } from '@/src/constants';
import Layout from '@/src/components/Layout';
import styled from 'styled-components';

type Inputs = {
  email: string;
  fullName: string;
};

const StyledParagraph = styled.p`
  width: 260px;
  max-width: 375px;
  color: ${Colors.grey};
  font-weight: bold;

  @media (min-width: 1140px) {
    width: auto;
    text-align: center;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = ({ children }: { children: ReactNode }): ReactElement => (
  <p role="alert" style={{ color: `${Colors.colorError}`, margin: '4px 0 0 0' }}>
    {children}
  </p>
);

const Participate = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const { mutate: registerParticipant, isLoading: isRegisterParticipantLoading } = useMutation(
    ['newParticipant'],
    registerNewParticipant,
    {
      onSuccess: () => {
        router.push('/listing');
      },
      onError: error => {
        console.log({ error });
      }
    }
  );

  return (
    <Layout>
      <Stack sx={{ alignItems: 'center' }} spacing={8}>
        <h2>Participate</h2>
        <StyledParagraph>Fill in your contact details and get a chance to win!</StyledParagraph>
        <StyledForm
          id="participate-form"
          onSubmit={handleSubmit(formData =>
            registerParticipant({
              name: formData.fullName,
              email: formData.email
            } satisfies NewParticipant)
          )}
        >
          <div>
            <TextInput
              type="text"
              label="Email"
              aria-label="email input field"
              placeholder="Email"
              {...register('email', {
                required: 'This field is required',
                pattern: { value: emailRegex(), message: 'Please provide a valid email address' }
              })}
              sx={{ width: '260px' }}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div>
            <TextInput
              type="text"
              label="Full name"
              aria-label="full name input field"
              placeholder="Full name"
              {...register('fullName', { required: 'This field is required' })}
              sx={{ width: '260px' }}
            />
            <ErrorMessage>{errors.fullName?.message}</ErrorMessage>
          </div>

          <Button
            type="submit"
            loading={isRegisterParticipantLoading}
            sx={{
              width: '260px',
              marginTop: '22px',
              borderColor: `${Colors.colorPrimary}`,
              background: 'white',
              color: `${Colors.colorPrimary}`,
              ':hover': { background: `${Colors.colorPrimary}`, color: 'white' }
            }}
          >
            Participate
          </Button>
        </StyledForm>
      </Stack>
    </Layout>
  );
};

export default Participate;
