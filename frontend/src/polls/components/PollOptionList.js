import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import PollOption from './PollOption';

import './Poll.css';

const PollOptionList = (props) => {
  return <CardDeck className='emptyPoll'>
    {props.options.map(option => (
      <PollOption
        key={option.id}
        title={option.name}
        description={option.description}
        imgs={option.imgs}
        poll={option.poll}
        votes={option.votes}
      />
    ))}
  </CardDeck>;
};

export default PollOptionList;
