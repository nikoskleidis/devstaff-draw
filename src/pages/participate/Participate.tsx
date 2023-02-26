import { Button, TextInput } from '@mantine/core';
import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { registerNewParticipant } from '@/src/api';
import { useForm } from 'react-hook-form';
import { NewParticipant } from '@/src/types';
import { emailRegex } from '@/src/constants';

type Inputs = {
  email: string;
  fullName: string;
};

const ErrorMessage = ({ children }: { children: ReactNode }): ReactElement => (
  <p role="alert" style={{ color: '#D92929FF', margin: '4px 0 0 0' }}>
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: '16px',
        alignItems: 'center'
      }}
    >
      <h2 style={{ alignSelf: 'center' }}>Participate</h2>
      <form
        id="participate-form"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={handleSubmit(formData =>
          registerParticipant({
            name: formData.fullName,
            participation_time: new Date().toDateString(),
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
        <Button type="submit" loading={isRegisterParticipantLoading} sx={{ width: '260px' }}>
          Participate
        </Button>
      </form>
    </div>
  );
};

export default Participate;
