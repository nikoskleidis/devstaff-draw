import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { getParticipants } from '@/src/api';
import Layout from '@/src/components/Layout';
import { StyledList, StyledListItem } from '@/src/pages/listing/styled';

const Listing = () => {
  const { data, isSuccess } = useQuery<Participant[]>(['participants'], getParticipants, {
    refetchInterval: 1500,
    select: data => data.filter(({ name }) => !!name)
  });

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return 'No participants yet';
  }

  return (
    <Layout>
      <div style={{ padding: '8px' }}>
        <h2>Listing page</h2>
        <StyledList>
          {data.map(participant => (
            <StyledListItem key={participant.id} $participantName={participant.name}>
              {participant.name}
            </StyledListItem>
          ))}
        </StyledList>
      </div>
    </Layout>
  );
};

export default Listing;
