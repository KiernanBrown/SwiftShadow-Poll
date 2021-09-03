import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ImageGallery from '../../shared/components/ImageGallery';

import './Poll.css';

const PollOption = (props) => {
  const { user, id } = props;

  let [totalVotes, setTotalVotes] = useState(
    props.votes ? props.votes.length : 0
  );

  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const handleShowDetails = () => {
    setShowDetails(true);
  };

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

  const headerImg = props.imgs ? props.imgs[0] : undefined;

  const VoteSection = () => {
    return (
      <>
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
      </>
    );
  };

  const DetailsModal = () => {
    return (
      <Modal
        show={showDetails}
        onHide={handleCloseDetails}
        animation={false}
        aria-labelledby='contained-modal-title-vcenter'
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.description}</p>
          <ImageGallery imgs={props.imgs}></ImageGallery>

          <div className='center'>
            <p>{totalVotes} Total Votes</p>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-block center'>
          <VoteSection />
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Card>
        <Card.Img
          className='optionImg'
          variant='top'
          src={headerImg.src}
          alt={headerImg.alt}
          onClick={handleShowDetails}
        />
        <Card.Body>
          <Card.Title className='optionTitle' onClick={handleShowDetails}>
            {props.title}
          </Card.Title>
          <Card.Text>{totalVotes} Total Votes</Card.Text>
        </Card.Body>
        <Card.Footer className='optionFooter'>
          <VoteSection />
        </Card.Footer>
      </Card>
      <DetailsModal />
    </>
  );
};

export default PollOption;
