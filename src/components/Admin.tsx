import { useMutation, useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { Button, Table } from '@mantine/core';
import { generateParticipants, getParticipants, newDraw, removeParticipant } from '@/src/api';
import { Colors } from '@/src/constants';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled(Table)`
  max-width: 1024px;
`;

const Admin = () => {
  const { data, isSuccess, refetch } = useQuery<Participant[]>(['participants'], getParticipants);

  const { mutate: newDrawMutation } = useMutation(newDraw, {
    onSuccess: () => {
      void refetch();
    },
    onError: error => {
      console.log({ error });
    }
  });

  const { mutate: removeParticipantMutation } = useMutation(removeParticipant, {
    onSuccess: () => {
      void refetch();
    },
    onError: error => {
      console.log({ error });
    }
  });

  const { mutate: generateParticipantsMutation } = useMutation(generateParticipants, {
    onSuccess: () => {
      void refetch();
    },
    onError: error => {
      console.log({ error });
    }
  });

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <Wrapper>
        <div>No participants yet</div>
        <Button
          sx={{
            width: '200px',
            margin: '22px',
            background: `${Colors.colorSecondary}`,
            color: 'white'
          }}
          onClick={() => generateParticipantsMutation()}
        >
          Mock Participants
        </Button>
      </Wrapper>
    );
  }

  const onNewDrawClick = () => {
    let text = 'All participants will be removed!\nEither OK or Cancel.';
    if (confirm(text)) {
      newDrawMutation();
    } else {
      console.log('No action taken!');
    }
  };

  return (
    <Wrapper>
      <ButtonsWrapper>
        <Button
          sx={{
            width: '200px',
            margin: '22px',
            background: `${Colors.colorPrimary}`,
            color: 'white'
          }}
          onClick={onNewDrawClick}
        >
          NEW DRAW
        </Button>
        <Button
          sx={{
            width: '200px',
            margin: '22px',
            background: `${Colors.colorSecondary}`,
            color: 'white'
          }}
          onClick={() => generateParticipantsMutation()}
        >
          Mock Participants
        </Button>
      </ButtonsWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>IsWinner</th>
            <th>Participation Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(participant => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              <td>{participant.isWinner ? 'yes' : 'no'}</td>
              <td>{participant.participationTime}</td>
              <td>
                <Button
                  sx={{
                    background: 'indianred',
                    color: 'white',
                    marginRight: '10px'
                  }}
                  onClick={() => removeParticipantMutation(participant.id)}
                  type="button"
                >
                  Delete
                </Button>
                {participant.isWinner ? (
                  <a href={`mailto:${participant.email}`}>
                    <Button type="button">Mail winner</Button>
                  </a>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

export default Admin;
