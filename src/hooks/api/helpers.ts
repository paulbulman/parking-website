import axios from "axios";

export const get = async <T>(
  getToken: () => Promise<string>,
  endpoint: string
) => {
  const url = createFullUrl(endpoint);
  const config = await createConfig(getToken);
  const { data } = await axios.get<T>(url, config);
  return data;
};

export const patch =
  (getToken: () => Promise<string>, endpoint: string) =>
  async <TRequestBody, TRequestResult>(patchData: TRequestBody) => {
    const url = createFullUrl(endpoint);
    const config = await createConfig(getToken);
    const { data } = await axios.patch<TRequestResult>(url, patchData, config);
    return data;
  };

export const post =
  (getToken: () => Promise<string>, endpoint: string) =>
  async <TRequestBody, TRequestResult>(patchData: TRequestBody) => {
    const url = createFullUrl(endpoint);
    const config = await createConfig(getToken);
    const { data } = await axios.post<TRequestResult>(url, patchData, config);
    return data;
  };

const createFullUrl = (endpoint: string) => {
  return `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`;
};

const createConfig = async (getToken: () => Promise<string>) => {
  const token = await getToken();
  return {
    headers: { Authorization: "Bearer " + token },
  };
};
