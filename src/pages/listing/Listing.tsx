import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { getParticipants } from '@/src/api';
import Layout from '@/src/components/Layout';
import { StyledList, StyledListItem } from '@/src/styled/listing.styled';

const participationTimeComparator = (a: Participant, b: Participant) =>
  Number(a.participationTime) - Number(b.participationTime);

const Listing = () => {
  const { data, isSuccess } = useQuery<
    Participant[],
    unknown,
    { winners: Participant[]; participants: Participant[] }
  >(['participants'], getParticipants, {
    refetchInterval: 1500,
    select: data => ({
      winners: data.filter(participant => participant.isWinner).sort(participationTimeComparator),
      participants: data.filter(participant => !participant.isWinner).sort(participationTimeComparator)
    })
  });

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  if (data.winners.length === 0 && data.participants.length === 0) {
    return 'No participants yet';
  }

  return (
    <Layout>
      <div style={{ padding: '8px' }}>
        <h2>Listing page</h2>

        {data.winners && data.winners.length > 0 ? (
          <>
            <h3>Winners</h3>
            <StyledList>
              {data.winners.map(participant => (
                <StyledListItem key={participant.id} $participantName={participant.name}>
                  {participant.name}
                </StyledListItem>
              ))}
            </StyledList>
          </>
        ) : null}

        {data.participants && data.participants.length > 0 ? (
          <>
            <h3>Participants</h3>
            <StyledList>
              {data.participants.map(participant => (
                <StyledListItem key={participant.id} $participantName={participant.name}>
                  {participant.name}
                </StyledListItem>
              ))}
            </StyledList>
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default Listing;
