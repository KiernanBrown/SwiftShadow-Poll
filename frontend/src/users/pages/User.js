import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import Image from 'react-bootstrap/Image';

import '../User.css';

const User = () => {
  const authenticated = useSelector((state) => state.userSlice.authenticated);
  const user = useSelector((state) => state.userSlice.user);

  let [foundUser, setFoundUser] = useState({});
  let [imageAlt, setImageAlt] = useState('');

  const userId = useParams().userId;

  const findUser = (uId) => {
    fetch(`http://localhost:5000/api/users/${uId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.dir(response.status);
        if (response.status === 200) return response.json();
        throw new Error('Failed to find user');
      })
      .then((responseJson) => {
        console.dir(responseJson);
        setFoundUser(responseJson.user);
        setImageAlt(`Profile image of ${responseJson.user.username}`);
      })
      .catch((error) => {
        console.dir(error);
        throw new Error(error);
      });
  };

  useEffect(() => {
    findUser(userId);
  }, [userId]);

  console.dir('in user');

  const handleLogout = () => {
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };

  return (
    <>
      {foundUser ? (
        <>
        {/* Profile Image and Username*/}
          <Image
            src={foundUser.image}
            alt={imageAlt}
            className='profileImg'
            roundedCircle='true'
          ></Image>
          <h2 className='center'>{foundUser.username}</h2>

          {/* Badge Section */}
          


          {/* Section only shown if you are signed in as this user */}
          {authenticated && user._id === foundUser._id ? (
            <div className='center'>

              {/* Logout Button */}
              <Button
                variant='danger'
                className='btn-lg'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>No user could be found for this User ID</div>
      )}
    </>
  );
};

export default User;
