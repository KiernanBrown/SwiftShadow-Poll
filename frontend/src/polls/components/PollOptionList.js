import React, { useState } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import PollOption from './PollOption';

import './Poll.css';

// Function that returns an object signifying what votes a user has placed

const countVotes = (user) => {
  let voteCount = 0;
  user.voteMap.forEach((option) => {
    voteCount += option;
  });
  return voteCount;
};

const initUser = (user, options) => {
  let userObj = {
    id: user.id,
    totalVotes: 10
  };

  userObj.voteMap = new Map();

  options.forEach((option) => {
    if(!userObj.voteMap.has(option.id)) {
      let optionVoteCount = 0;
      if (option.votes) {
        optionVoteCount = option.votes.filter((vote) => {
          return vote === user.id;
        }).length;
      }
      userObj.voteMap.set(option.id, optionVoteCount);
    }
  });

  userObj.votes = countVotes(userObj);

  return userObj;
};

const PollOptionList = (props) => {
  const [userVotes, setUserVotes] = useState(
    initUser(props.user, props.options)
  );

  const updateUser = (optionId, votes) => {
    console.dir(optionId);
    console.dir(votes);

    userVotes.voteMap.set(optionId, votes);

    setUserVotes({
      id: userVotes.id,
      totalVotes: userVotes.totalVotes,
      voteMap: userVotes.voteMap,
      votes: countVotes(userVotes)
    })

    // Write to database in the future
  };

  return (
    <CardDeck className='emptyPoll'>
      {props.options.map((option) => (
        <PollOption
          key={option.id}
          id={option.id}
          title={option.name}
          description={option.description}
          imgs={option.imgs}
          poll={option.poll}
          votes={option.votes}
          user={userVotes}
          updateHandler={updateUser.bind(this)}
        />
      ))}
    </CardDeck>
  );
};

export default PollOptionList;
