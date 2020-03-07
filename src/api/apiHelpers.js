import axios from "axios";

import { getUserIdToken } from "../services/authenticationService";

const baseUri = process.env.REACT_APP_API_BASE_URI;

const createAuthorizationHeader = async () => {
  const token = await getUserIdToken();

  return {
    headers: {
      Authorization: token
    }
  };
};

export const get = async uri => {
  try {
    const config = await createAuthorizationHeader();
    const response = await axios.get(`${baseUri}${uri}`, config);
    return response.data;
  } catch (e) {
    console.dir(e);
    throw e;
  }
};

export const post = async (uri, data) => {
  try {
    const config = await createAuthorizationHeader();
    const response = await axios.post(`${baseUri}${uri}`, data, config);
    return response.data;
  } catch (e) {
    console.dir(e);
    throw e;
  }
};

export const del = async uri => {
  try {
    const config = await createAuthorizationHeader();
    const response = await axios.delete(`${baseUri}${uri}`, config);
    return response.data;
  } catch (e) {
    console.dir(e);
    throw e;
  }
};
