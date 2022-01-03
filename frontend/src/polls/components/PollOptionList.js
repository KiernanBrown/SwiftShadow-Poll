import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../services/user';
import { clearPendingVotes } from '../../features/userSlice';
import PollOption from './PollOption';

import './Poll.css';

const PollOptionList = (props) => {
  const dispatch = useDispatch();
  const { pollId } = props;
  const authenticated = useSelector((state) => state.userSlice.authenticated);
  const user = useSelector((state) => state.userSlice.user);
  const [options, setOptions] = useState([]);
  const [remainingVotes, setRemainingVotes] = useState(0);

  const getRemainingVotes = useCallback(() => {
    let pendingVoteCount = 0;
    if (user.pendingVotes && user.pendingVotes.length > 0) {
      // Check the pending votes and add them together
      user.pendingVotes.forEach((pendingVote) => {
        pendingVoteCount += pendingVote.votes;
      });
    }

    let userPoll = user.polls.find((el) => {
      return el.pollId === pollId;
    });

    setRemainingVotes(userPoll.voteCap - (userPoll.votes + pendingVoteCount));
  }, [user, pollId]);

  const getPollOptions = useCallback(() => {
    fetch(`http://localhost:5000/api/options/poll/${pollId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) return response.json();
        throw new Error('Failed to fetch poll options');
      })
      .then((responseJson) => {
        //console.dir(responseJson);
        setOptions(responseJson.options);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [pollId]);

  const vote = () => {
    if (user.pendingVotes && user.pendingVotes.length > 0) {
      let jsonBody = {
        userId: user._id,
        pollId: pollId,
        votes: user.pendingVotes,
      };
      //console.dir(jsonBody);

      fetch(`http://localhost:5000/api/options/vote`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      })
        .then((response) => {
          if (response.status === 200) {
            clearPendingVotes();
            GetUser(dispatch);
          } else {
            throw new Error('Failed to vote');
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  };

  useEffect(() => {
    // Populate poll options
    getPollOptions();
    if (authenticated) {
      getRemainingVotes();
    }
  }, [user, pollId, authenticated, getPollOptions, getRemainingVotes]);

  const VoteButton = () => {
    if (authenticated) {
      if (user.pendingVotes && user.pendingVotes.length > 0) {
        return (
          <div className='d-grid gap-4'>
            <Button variant='success' size='lg' onClick={vote}>
              Submit Votes!
            </Button>
          </div>
        );
      } else {
        return (
          <div className='d-grid gap-4'>
            <Button variant='success' size='lg' disabled>
              Submit Votes!
            </Button>
          </div>
        );
      }
    }
    return <></>;
  };

  if (!authenticated) {
    return (
      <Card className='emptyPoll'>
        <Card.Body>
          <h4>Loading User</h4>
        </Card.Body>
      </Card>
    );
  }

  if (options.length === 0) {
    return (
      <Card className='emptyPoll'>
        <Card.Body>
          <h4>
            There are no available options to vote on for this poll, please
            check back later!
          </h4>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <aside role='note' className='callout'>
        <h4>Placeholder Title</h4>
        <div>
          You have {remainingVotes} votes remaining. Use the + and - buttons to
          add or subtract votes for a poll option respectively. You can use
          multiple votes on the same option.
        </div>
      </aside>
      <VoteButton />
      <CardDeck className='emptyPoll'>
        {options
          .sort((a, b) => {
            let aVotes = a.votes ? a.votes.length : 0;
            let bVotes = b.votes ? b.votes.length : 0;
            return bVotes - aVotes;
          })
          .map((option) => (
            <PollOption
              key={option.id}
              id={option.id}
              title={option.name}
              description={option.description}
              imgs={option.imgs}
              poll={option.poll}
              votes={option.votes}
              remainingVotes={remainingVotes}
            />
          ))}
      </CardDeck>
    </>
  );
};

export default PollOptionList;
