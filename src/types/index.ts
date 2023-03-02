export type Participant = {
  id: string;
  name: string;
  email: string;
  participationTime: string;
  isWinner: boolean;
};

export type NewParticipant = Pick<Participant, 'name' | 'email'>;
