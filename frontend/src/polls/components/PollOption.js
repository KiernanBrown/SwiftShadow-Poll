import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import ImageGallery from '../../shared/components/ImageGallery';

import './Poll.css';
import { updatePendingVotes } from '../../features/userSlice';

const PollOption = (props) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.userSlice.authenticated);
  const user = useSelector((state) => state.userSlice.user);
  const { id, title, votes, description, imgs, poll } = props;

  const [showDetails, setShowDetails] = useState(false);

  const countVotes = () => {
    let voteCount = 0;
    votes.forEach((voteObj) => {
      voteCount += voteObj.votes;
    });
    return voteCount;
  };

  const getOptionVotes = () => {
    let voteObj = votes.find((vote) => {
      return vote.user === user._id;
    });
    return voteObj ? voteObj.votes : 0;
  };

  const getUserVotes = useCallback(() => {
    let userVoteOBJ = user.polls.find((el) => {
      return el.pollId === poll;
    });

    if (user.pendingVoteCount) {
      return { ...userVoteOBJ, votes: userVoteOBJ.votes + user.pendingVoteCount };
    }

    return userVoteOBJ;
  }, [user, poll]);

  let [totalVotes, setTotalVotes] = useState(countVotes());
  let [userVotes, setUserVotes] = useState(getUserVotes());

  let [optionVotes, setOptionVotes] = useState(getOptionVotes());

  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const handleShowDetails = () => {
    setShowDetails(true);
  };

  useEffect(() => {
    // Update the user's votes
    if (authenticated) {
      setUserVotes(getUserVotes());
    }
  }, [user, poll, authenticated, getUserVotes]);

  const addVote = () => {
    // Steps that need to take place here
    // 1. Update the users votes for this id
    // 2. Update the total amount of votes for this i
    if (userVotes.votes  < userVotes.voteCap) {
      setOptionVotes(optionVotes + 1);
      setTotalVotes(totalVotes + 1);

      dispatch(
        updatePendingVotes({
          optionId: id,
          votes: 1,
        })
      );
    }
  };

  const removeVote = () => {
    if (optionVotes > 0) {
      //setUserVotes({ ...userVotes, votes: userVotes.votes - 1 });
      setOptionVotes(optionVotes - 1);
      setTotalVotes(totalVotes - 1);

      dispatch(
        updatePendingVotes({
          optionId: id,
          votes: -1,
        })
      );
    }
  };

  const headerImg = imgs ? imgs[0] : undefined;

  const VoteSection = () => {
    if (authenticated) {
      return (
        <>
          {optionVotes > 0 ? (
            <Button variant='outline-primary' onClick={removeVote}>
              -
            </Button>
          ) : (
            <Button variant='outline-primary' disabled>
              -
            </Button>
          )}
          <p className='yourVotes'>Your Votes: {optionVotes}</p>
          {props.remainingVotes > 0 ? (
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
    }

    return <></>;
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
          <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
          <ImageGallery imgs={imgs}></ImageGallery>

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
            {title}
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
