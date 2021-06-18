import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './Poll.css';

const PollOption = (props) => {

  const { user, id } = props;

  let [totalVotes, setTotalVotes] = useState(
    props.votes ? props.votes.length : 0
  );

  const addVote = () => {
    // Steps that need to take place here
    // 1. Update the users votes for this id
    // 2. Update the total amount of votes for this id
    if (user.votes < user.totalVotes) {
      let voteCount = user.voteMap.get(id) + 1;
      totalVotes++;

      setTotalVotes(totalVotes);
      props.updateHandler(id, voteCount);
    }
  };

  const removeVote = () => {
    if (user.voteMap.get(id) - 1 >= 0) {
      let voteCount = user.voteMap.get(id) - 1;
      totalVotes--;

      setTotalVotes(totalVotes);
      props.updateHandler(id, voteCount);
    }
  };

  let headerImg = props.imgs ? props.imgs[0] : undefined;
  return (
    <Card>
      <Card.Img className='optionImg' variant='top' src={headerImg} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {<Card.Text>{totalVotes} Votes</Card.Text>}
      </Card.Body>
      <Card.Footer className='optionFooter'>
        {user.voteMap.get(id) > 0 ? (
          <Button variant='outline-primary' onClick={removeVote}>
            -
          </Button>
        ) : (
          <Button variant='outline-primary' disabled>
            -
          </Button>
        )}
        <p className='yourVotes'>Your Votes: {user.voteMap.get(id)}</p>
        {user.votes < user.totalVotes ? (
          <Button variant='outline-primary' onClick={addVote}>
            +
          </Button>
        ) : (
          <Button variant='outline-primary' disabled>
            +
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default PollOption;
