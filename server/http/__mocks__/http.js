// const fetchMock = require("fetch-mock");
import { jest } from "@jest/globals";

// const httpClient = fetchMock.sandbox();
const sendRequest = async function () {
  console.log(`You've hit the mock!`);
  return Promise.resolve({
    response: {
      equipment: {
        data: {
          items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        },
      },
    },
  });

  // return jest.fn(() => {
  //   Promise.resolve({
  //     response: {
  //       equipment: {
  //         data: {
  //           items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  //         },
  //       },
  //     },
  //   });
  // });

  // return jest.fn(() => {
  //   const res = {
  //     response: {
  //       equipment: {
  //         data: {
  //           items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  //         },
  //       },
  //     },
  //   };
  //   return res;
  // });
};

export { sendRequest };
