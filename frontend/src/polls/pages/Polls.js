import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../services/user';
import PollList from '../components/PollList';

const Polls = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.userSlice.authenticated);
  const user = useSelector((state) => state.userSlice.user);
  const [polls, setPolls] = useState([]);

  // Method to clean user's polls and update them in the database
  // This will either add new polls or remove old ones
  const cleanPolls = useCallback((polls) => {
    console.dir('getting user votes');
    let activePolls = [];
    let pollsChanged = false;
    polls.forEach((p) => {
      console.dir(p);
      let userPoll = user.polls.find((el) => {
        return el.pollId === p.id;
      });

      if (!userPoll) {
        pollsChanged = true;
        userPoll = {
          pollId: p.id,
          votes: 0,
          voteCap:
            user.subTier === 'Non Subscriber'
              ? p.voteCap
              : p.voteCap * p.voteMultipliers[user.subTier],
        };
      }

      console.dir(userPoll);
      activePolls.push(userPoll);
    });

    if (pollsChanged) {
      // Update the user
      fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          polls: activePolls,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Failed to update user');
          }
          GetUser(dispatch);
        })
        .catch((error) => {
          console.dir(error);
          throw new Error(error);
        });
    }
  }, [user, dispatch]);

  useEffect(() => {
    // Populate Polls
    fetch('http://localhost:5000/api/polls', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) return response.json();
        throw new Error('Failed to fetch polls');
      })
      .then((responseJson) => {
        console.dir(responseJson);
        setPolls(responseJson.polls);
        if (authenticated) {
          cleanPolls(responseJson.polls);
        }
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [authenticated, cleanPolls]);

  return <PollList polls={polls} />;
};

export default Polls;
