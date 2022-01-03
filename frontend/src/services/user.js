import { setUser } from '../features/userSlice';

export const GetUser = async (dispatch) => {
  fetch('http://localhost:5000/api/auth/user', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  })
    .then((response) => {
      console.dir(response);
      if (response.status === 200) return response.json();
      console.dir('failed to authenticate');
      throw new Error('failed to authenticate user');
    })
    .then((responseJson) => {
      dispatch(setUser(responseJson.user));
    })
    .catch((error) => {
      console.dir(error);
    });
};