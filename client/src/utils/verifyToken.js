import Axios from 'axios';

const verifyToken = async (token) => {
  let APIResponse = [];

  const appUri = process.env.REACT_APP_API_URI;

  try {
    let formData = new FormData();
    formData.append('token', token);
    formData.append('secret_key', process.env.REACT_APP_SECRET_KEY);

    let response = await Axios.post(`${appUri}/verify-token`, {
      token: token,
      secret_key: process.env.REACT_APP_SECRET_KEY,
    });

    console.log(response);
    APIResponse.push(response.data);
    return APIResponse;
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;
