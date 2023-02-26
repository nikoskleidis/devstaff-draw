import { Autocomplete, Button, Loader, TextInput } from '@mantine/core';
import { FormEvent, useRef, useState } from 'react';
import { BASE_URL } from '@/src/pages/api/participants';
import { useRouter } from 'next/router';

const Participate = () => {
  const timeoutRef = useRef<number>(-1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setEmail(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map(provider => `${val}@${provider}`));
      }, 1000);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const { fullName, email } = e.target;

    const data = {
      email: email.value.trim(),
      name: fullName.value.trim(),
      participation_time: new Date().toDateString()
    };

    await fetch(`${BASE_URL}/participants`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        router.push('/listing');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
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
          onChange={handleChange}
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
        <Button type="submit">Participate</Button>
      </form>
    </div>
  );
};

export default Participate;
