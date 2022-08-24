export const get = async <T>(
  getToken: () => Promise<string>,
  endpoint: string
) => {
  const url = createFullUrl(endpoint);

  const token = await getToken();
  const requestOptions = {
    headers: { Authorization: "Bearer " + token },
  };

  const response = await fetch(url, requestOptions);
  const data: T = await response.json();

  return data;
};

export const patch =
  (getToken: () => Promise<string>, endpoint: string) =>
  async <TRequestBody, TRequestResult>(patchData: TRequestBody) => {
    const url = createFullUrl(endpoint);

    const token = await getToken();
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    };

    const response = await fetch(url, requestOptions);
    const data: TRequestResult = await response.json();

    return data;
  };

export const post =
  (getToken: () => Promise<string>, endpoint: string) =>
  async <TRequestBody, TRequestResult>(patchData: TRequestBody) => {
    const url = createFullUrl(endpoint);

    const token = await getToken();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    };

    const response = await fetch(url, requestOptions);
    const data: TRequestResult = await response.json();

    return data;
  };

export const httpDelete = async (
  getToken: () => Promise<string>,
  endpoint: string
) => {
  const url = createFullUrl(endpoint);

  const token = await getToken();
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  };

  await fetch(url, requestOptions);

  return undefined as never;
};

const createFullUrl = (endpoint: string) => {
  return `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`;
};
