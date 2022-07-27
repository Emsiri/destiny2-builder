import fetch from "node-fetch";

const sendRequest = async function (apiKey, url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
      },
    });
    const { Response } = await res.json();
    return Response;
  } catch (err) {
    throw new Error(`Error with base request fetch ${err.message}`);
  }
};
export { sendRequest };
