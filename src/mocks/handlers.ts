import { rest } from "msw";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const handlers = [
  rest.get(`${baseUrl}/overview`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        overview: {
          weeks: [
            {
              days: [
                {
                  localDate: "2021-05-17",
                  data: {
                    allocatedUsers: [
                      { name: "User 1", isHighlighted: false },
                      { name: "User 3", isHighlighted: false },
                    ],
                    interruptedUsers: [
                      { name: "User 2", isHighlighted: false },
                      { name: "User 4", isHighlighted: true },
                    ],
                  },
                  hidden: false,
                },
                {
                  localDate: "2021-05-18",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: false,
                },
                {
                  localDate: "2021-05-19",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: false,
                },
                {
                  localDate: "2021-05-20",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: false,
                },
                {
                  localDate: "2021-05-21",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: true,
                },
              ],
            },
            {
              days: [
                {
                  localDate: "2021-05-24",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: true,
                },
                {
                  localDate: "2021-05-25",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: false,
                },
                {
                  localDate: "2021-05-26",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: false,
                },
                {
                  localDate: "2021-05-27",
                  data: { allocatedUsers: [], interruptedUsers: [] },
                  hidden: false,
                },
                {
                  localDate: "2021-05-28",
                  data: {
                    allocatedUsers: [{ name: "User 4", isHighlighted: true }],
                    interruptedUsers: [
                      { name: "User 1", isHighlighted: false },
                      { name: "User 3", isHighlighted: false },
                      { name: "User 2", isHighlighted: false },
                    ],
                  },
                  hidden: false,
                },
              ],
            },
          ],
        },
      })
    );
  }),
];
