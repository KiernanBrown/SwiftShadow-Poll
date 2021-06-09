import React from 'react';
import PollItem from './PollItem';

import './Poll.css';

const PollList = (props) => {
  if (props.polls.length === 0) {
    return (
      <div>
        <h2 className='center heading'>
          No polls are active right now, please check back later!
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className='center heading'>
        A list of active polls can be seen below:
      </h2>
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
