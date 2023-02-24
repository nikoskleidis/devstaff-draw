import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { getParticipants } from '@/src/api';

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
