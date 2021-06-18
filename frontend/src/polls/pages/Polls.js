import PollList from '../components/PollList';

// Method to be removed at a later date. Just for testing.
const DUMMY_ADD_DAYS = (date, days) => {
  let newDate = new Date(date);
  newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000);
  return newDate;
};

const DUMMY_POLLS = [
  {
    id: 'june-emotes',
    title: 'June Emotes',
    subtitle: 'Vote on what emotes should be on the channel for the month!',
    description:
      "This is the usual emote voting process but presented in a much better way than before! You'll be able to vote on what emotes you'd like to see as the tier one emotes on my Twitch channel like you normally would. Any emotes that are not chosen through this voting process will be available for everyone to use in the channel through BTTV.",
    deadline: DUMMY_ADD_DAYS(Date.now(), 1.00005),
    phase: 'Open',
  },
  {
    id: 'watch-party',
    title: 'Next Watch Party',
    subtitle: 'Vote on what we should watch next!',
    deadline: DUMMY_ADD_DAYS(Date.now(), 3.0001),
    phase: 'Open',
  },
];

const Polls = () => {
  return <PollList polls={DUMMY_POLLS} />;
};

export default Polls;
