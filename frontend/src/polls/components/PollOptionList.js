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
    totalVotes: 10,
  };

  userObj.voteMap = new Map();

  options.forEach((option) => {
    if (!userObj.voteMap.has(option.id)) {
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
    setUserVotes((prevUser) => {
      prevUser.voteMap.set(optionId, votes);
      return {
        ...prevUser,
        votes: countVotes(prevUser),
      };
    });

    // Write to database in the future
  };

  console.dir(props);

  return (
    <>
      <aside role='note' className='callout'>
        <h4>Placeholder Title</h4>
        <div>You have {userVotes.totalVotes - userVotes.votes} votes remaining. Use the + and - buttons to add or subtract votes for a poll option respectively. You can use multiple votes on the same option.
        
        </div>
      </aside>
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
    </>
  );
};

export default PollOptionList;
