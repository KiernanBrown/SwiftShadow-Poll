import React from 'react';
import { useParams } from 'react-router-dom';
import PollOptionList from '../components/PollOptionList';

const DUMMY_OPTIONS = [
  {
    id: 'june-emotes_swifts7Nice',
    name: 'swifts7Nice',
    imgs: [
      'https://cdn.betterttv.net/emote/5d696a6f4932b21d9c3357b3/3x',
      'https://i.imgur.com/Hi7FwYe.png',
    ],
    poll: 'june-emotes',
    votes: ['test', 'test', 'test1'],
  },
  {
    id: 'june-emotes_swifts7Love',
    name: 'swifts7Love',
    imgs: [
      'https://cdn.betterttv.net/emote/5f259b0c6f3782446601ef12/3x',
      'https://i.imgur.com/8s66Rt8.png',
    ],
    votes: ['test', 'test', 'test', 'test', 'test', 'test', 'test'],
    poll: 'june-emotes',
  },
  {
    id: 'june-emotes_swifts7Flex',
    name: 'swifts7Flex',
    imgs: [
      'https://cdn.betterttv.net/emote/5f259adffe85fb4472d1d3ee/3x'
    ],
    poll: 'june-emotes',
  },
  {
    id: 'watch-party_Chihayafuru',
    name: 'Chihayafuru',
    poll: 'watch-party',
  },
];

const PollVoting = (props) => {
  const pollId = useParams().pollId;
  const options = DUMMY_OPTIONS.filter((option) => option.poll === pollId);
  return <PollOptionList options={options} />;
};

export default PollVoting;
