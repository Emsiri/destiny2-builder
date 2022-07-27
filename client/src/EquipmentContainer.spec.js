import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EquipmentContainer from "./EquipmentContainer.js";
const equipmentResponse = {
  data: [
    {
      name: "Monte Carlo",
      imageUrl:
        "/common/destiny2_content/icons/3885eb5206a2f3b8a85a020fb87d34a7.jpg",
      itemTypeDisplayName: "Auto Rifle",
      hash: 4068264807,
    },
    {
      name: "The Enigma",
      imageUrl:
        "/common/destiny2_content/icons/c85736c0519708eae6bcf5f2d73fd012.jpg",
      itemTypeDisplayName: "Glaive",
      hash: 2595497736,
    },
  ],
};

const server = setupServer(
  rest.get(
    "http://localhost:3001/v1/equippedImages/2305843009300358704",
    (req, res, ctx) => {
      return res(ctx.json(equipmentResponse));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Displays equipment", async () => {
  render(<EquipmentContainer />);
  await waitFor(() => screen.getByTestId("loading-header"));
  await waitFor(() => screen.getByTestId("equipped-image-0"));
  await waitFor(() => screen.getByTestId("equipped-image-1"));
});
