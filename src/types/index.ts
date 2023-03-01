export type Participant = {
  id: number;
  name: string;
  email: string;
  participationTime: string;
  isWinner: boolean;
};

export type NewParticipant = Pick<Participant, 'name' | 'email'>;
