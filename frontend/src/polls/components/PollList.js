import React from 'react';
import PollItem from './PollItem';
import Card from 'react-bootstrap/Card';

import './Poll.css';

const PollList = (props) => {
  if (props.polls.length === 0) {
    return (
      <Card className='emptyPoll'>
        <Card.Body>
          <h2>There are no active polls right now, please check back later!</h2>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <div className='heading'></div>
      {props.polls.map((poll) => (
        <PollItem
          key={poll.id}
          id={poll.id}
          img={poll.img}
          title={poll.title}
          subtitle={poll.subtitle}
          description={poll.description}
          deadline={poll.deadline}
          phase={poll.phase}
        />
      ))}
    </div>
  );
};

export default PollList;
