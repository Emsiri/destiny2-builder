import axios from "axios";

const sendRequest = async function (apiKey, url) {
  try {
    const response = axios.get(url, {
      headers: {
        "X-API-Key": apiKey,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    throw new Error(`Error with the request ${err.message}`);
  }
};
export { sendRequest };
