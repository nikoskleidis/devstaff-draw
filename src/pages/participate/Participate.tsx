import { Autocomplete, Button, Loader, TextInput } from '@mantine/core';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { registerNewParticipant } from '@/src/api';

const Participate = () => {
  const router = useRouter();

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

  const [email, setEmail] = useState('');
  const [loading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const { fullName, email } = e.target;

    registerParticipant({
      email: email.value.trim(),
      name: fullName.value.trim(),
      participation_time: new Date().toDateString()
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '260px',
        margin: 'auto',
        padding: '16px'
      }}
    >
      <h2 style={{ alignSelf: 'center' }}>Participate</h2>
      <form
        id="participate-form"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={handleSubmit}
      >
        <Autocomplete
          type="email"
          id="email"
          name="email"
          data={data}
          value={email}
          label="Email"
          aria-label="email input field"
          placeholder="Email"
          rightSection={loading ? <Loader size={16} /> : null}
          onChange={value => {
            setEmail(value);
            setData([]);
          }}
          required
        />
        <TextInput
          type="text"
          id="fullName"
          name="fullName"
          label="Full name"
          aria-label="full name input field"
          placeholder="Full name"
          required
        />
        <Button type="submit" loading={isRegisterParticipantLoading}>
          Participate
        </Button>
      </form>
    </div>
  );
};

export default Participate;
