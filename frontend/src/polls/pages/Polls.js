import PollList from '../components/PollList';

const DUMMY_POLLS = [
  {
    id: 'june-emotes',
    title: 'June Emote Vote',
    description: 'Vote on what emotes should be on the channel for the month!',
  },
];

const Polls = () => {
  return <PollList polls={DUMMY_POLLS} />;
};

export default Polls;
