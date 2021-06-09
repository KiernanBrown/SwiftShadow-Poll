import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PollCountdown from './PollCountdown';
import './Poll.css';

const PollItem = (props) => {
  console.dir(props);
  return (
    <>
      <Card className='pollCard'>
        {props.img && <Card.Img variant='top' src={props.img}></Card.Img>}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          {props.subtitle && (
            <Card.Subtitle className='mb-2 text-muted'>
              {props.subtitle}
            </Card.Subtitle>
          )}
          {props.description && (
            <Card.Text className='pollDescription'>
              {props.description}
            </Card.Text>
          )}
          {props.phase === 'Open' && (
            <Button
              variant='outline-primary'
              size='lg'
              as={Link}
              to={`/polls/${props.id}`}
            >
              Vote
            </Button>
          )}
          {props.phase === 'Pending' && (
            <Button variant='outline-dark' size='lg' disabled>
              Results Pending
            </Button>
          )}
          {props.phase === 'Results' && (
            <Button
              variant='outline-success'
              size='lg'
              as={Link}
              to={`/polls/${props.id}`}
            >
              Results
            </Button>
          )}
        </Card.Body>
        <Card.Footer>
          <PollCountdown deadline={props.deadline} />
        </Card.Footer>
      </Card>
    </>
  );
};

export default PollItem;
