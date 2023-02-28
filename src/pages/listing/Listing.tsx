import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { motion } from 'framer-motion';
import { getParticipants } from '@/src/api';
import { stringToHSL } from '@/src/utils';

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
    <div style={{ padding: '8px' }}>
      <h2>Listing page</h2>
      <motion.ol
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.5
            }
          }
        }}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: '0' }}
      >
        {data.map(participant => (
          <motion.li
            key={participant.id}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            style={{
              textAlign: 'center',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              backgroundColor: stringToHSL(participant.name)
            }}
          >
            {participant.name}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
};

export default Listing;
