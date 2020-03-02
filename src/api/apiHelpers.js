import axios from "axios";

const baseUri = process.env.REACT_APP_API_BASE_URI;

export const get = async (uri, token) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    };

    const response = await axios.get(`${baseUri}${uri}`, config);
    return response.data;
  } catch (e) {
    console.dir(e);
    throw e;
  }
};
