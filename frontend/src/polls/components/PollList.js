import React from 'react';
import PollItem from './PollItem';

const PollList = (props) => {
  if (props.polls.length === 0) {
    return (
      <div>
        <h2>No polls are active right now, please check back later!</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>A list of active polls can be seen below:</h2>
      {props.polls.map((poll) => (
        <PollItem
          key={poll.id}
          id={poll.id}
          img={poll.img}
          title={poll.title}
          description={poll.description}
        />
      ))}
    </div>
  );
};

export default PollList;
