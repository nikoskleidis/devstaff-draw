import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';

const getParticipants = async (): Promise<Participant[]> => {
  const res = await fetch('api/participants');
  return res.json();
};

const Draw = () => {
  const { data, isSuccess } = useQuery<Participant[]>(['participants'], getParticipants);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return 'No participants yet';
  }

  return (
    <div>
      Draw page
      {data.map(participant => (
        <div key={participant.id}>{participant.name}</div>
      ))}
    </div>
  );
};

export default Draw;
