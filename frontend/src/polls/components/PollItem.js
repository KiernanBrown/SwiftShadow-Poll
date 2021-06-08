import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PollItem = (props) => {
  return (
    <>
      <Card>
        {props.img && <Card.Img variant='top' src={props.img}></Card.Img>}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant='primary' href={`/polls/${props.id}`}>Vote</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default PollItem;
