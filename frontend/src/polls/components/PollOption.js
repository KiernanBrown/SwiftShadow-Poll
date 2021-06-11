import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './Poll.css';


const PollOption = (props) => {
  console.dir(props);
  let totalVotes = props.votes ? props.votes.length : 0;
  let yourVotes = props.votes ? props.votes.filter(voter => voter === 'test1').length : 0;
  let headerImg = props.imgs ? props.imgs[0] : undefined;
  return (
    <Card>
      <Card.Img className='optionImg' variant='top' src={headerImg} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {<Card.Text>{totalVotes} Votes</Card.Text>}
      </Card.Body>
      <Card.Footer className='optionFooter'>
        <Button>-</Button>
        <p className='yourVotes'>Your Votes: {yourVotes}</p>
        <Button>+</Button>
      </Card.Footer>
    </Card>
  );
};

export default PollOption;
