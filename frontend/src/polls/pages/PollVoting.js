import React from 'react';
import { useParams } from 'react-router-dom';
import PollOptionList from '../components/PollOptionList';

const DUMMY_OPTIONS = [
  {
    id: 'june-emotes_swifts7Nice',
    name: 'swifts7Nice',
    imgs: [
      {
        src: 'https://cdn.betterttv.net/emote/5d696a6f4932b21d9c3357b3/3x',
        alt: 'Nice emote of Aqua from Kingdom Hearts!',
      },
      {
        src: 'https://i.imgur.com/Hi7FwYe.png',
        alt: 'swifts7Nice in a Twitch chat test.',
      },
    ],
    description: 'Nice emote of Aqua from Kingdom Hearts! Made by Fishiebug.',
    poll: 'june-emotes',
    votes: ['test', 'test', 'test1'],
  },
  {
    id: 'june-emotes_swifts7Love',
    name: 'swifts7Love',
    imgs: [
      {
        src: 'https://cdn.betterttv.net/emote/5f259b0c6f3782446601ef12/3x',
        alt: 'Love emote of Naminé from Kingdom Hearts!',
      },
      {
        src: 'https://i.imgur.com/8s66Rt8.png',
        alt: 'swifts7Love in a Twitch chat test.',
      },
    ],
    description: 'Love emote of Naminé from Kingdom Hearts! Made by Fishiebug.',
    votes: ['test', 'test', 'test', 'test', 'test', 'test', 'test'],
    poll: 'june-emotes',
  },
  {
    id: 'june-emotes_swifts7Flex',
    name: 'swifts7Flex',
    imgs: [
      {
        src: 'https://cdn.betterttv.net/emote/5f259adffe85fb4472d1d3ee/3x',
        alt: 'Flex emote of Tifa from Final Fantasy VII!',
      },
    ],
    description:
      'Flex emote of Tifa from Final Fantasy VII! Made by Fran-nyan.',
    poll: 'june-emotes',
  },
  {
    id: 'watch-party_Chihayafuru',
    name: 'Chihayafuru',
    poll: 'watch-party',
  },
];

const DUMMY_USER = {
  name: 'Tester',
  id: 'test1',
  totalVotes: 5,
};

const PollVoting = (props) => {
  const pollId = useParams().pollId;
  const options = DUMMY_OPTIONS.filter((option) => option.poll === pollId);
  return <PollOptionList options={options} user={DUMMY_USER} />;
};

export default PollVoting;
