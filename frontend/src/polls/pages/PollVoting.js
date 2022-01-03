import React from 'react';
import { useParams } from 'react-router-dom';
import PollOptionList from '../components/PollOptionList';

const PollVoting = (props) => {

  const pollId = useParams().pollId;

  return <PollOptionList pollId={pollId} />;
};

export default PollVoting;
