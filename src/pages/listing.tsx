import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { getParticipants } from '@/src/api';
import Layout from '@/src/components/Layout';
import { StyledList, StyledListItem } from '@/src/styled/listing.styled';
import Head from 'next/head';

const participationTimeComparator = (a: Participant, b: Participant) =>
  new Date(b.participationTime).getTime() - new Date(a.participationTime).getTime();

const groupParticipantsBasedOnDrawResult = (
  participants: Participant[] = []
): [winners: Participant[], losers: Participant[]] => {
  const winners: Participant[] = [];

  for (let i = participants.length - 1; i >= 0; i--) {
    if (participants[i].isWinner) {
      const [personWithLuck] = participants.splice(i, 1);
      winners.push(personWithLuck);
    }
  }

  return [winners, participants];
};

const Listing = () => {
  const { data, isSuccess } = useQuery<
    Participant[],
    unknown,
    { winners: Participant[]; participants: Participant[] }
  >(['participants'], getParticipants, {
    refetchInterval: 1500,
    select: data => {
      const [winners, losers] = groupParticipantsBasedOnDrawResult(data);

      return {
        winners: winners.sort(participationTimeComparator),
        participants: losers.sort(participationTimeComparator)
      };
    }
  });

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  if (data.winners.length === 0 && data.participants.length === 0) {
    return 'No participants yet';
  }

  return (
    <>
      <Head>
        <title>Listing</title>
        <meta name="description" content="See who has joined the draw" />
      </Head>

      <Layout>
        <div style={{ padding: '8px' }}>
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
    </>
  );
};

export default Listing;
