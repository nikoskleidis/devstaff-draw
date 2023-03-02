import { useMutation, useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { getParticipants, newDraw } from '@/src/api';

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

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No participants yet</div>;
  }

  const onNewDrawClick = () => {
    let text = 'All participants will be removed!\nEither OK or Cancel.';
    if (confirm(text)) {
      newDrawMutation();
    } else {
      console.log('No action taken!');
    }
  };

  const removeParticipant = (id: number) => {
    console.log('Remove participant', id);
  };

  return (
    <div>
      <button onClick={onNewDrawClick}>NEW DRAW</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>has won</th>
            <th>participation time</th>
            <th>actions</th>
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
                <button onClick={() => removeParticipant(participant.id)} type="button">
                  X
                </button>
                {participant.isWinner ? <a href={`mailto:${participant.email}`}>Mail winner</a> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
