export type Participant = {
  id: number;
  name: string;
  email: string;
  participation_time: string;
};

export type NewParticipant = {
  email: string;
  name: string;
  participation_time: string;
};
