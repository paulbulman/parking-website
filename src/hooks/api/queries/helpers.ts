import axios from "axios";

export const get = async <T>(
  getToken: () => Promise<string>,
  endpoint: string
) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`;

  const token = await getToken();

  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  
  const { data } = await axios.get<T>(url, config);
  return data;
};
