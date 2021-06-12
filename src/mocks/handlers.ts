import { rest } from "msw";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const overviewData = {
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
          data: null,
          hidden: true,
        },
      ],
    },
    {
      days: [
        {
          localDate: "2021-05-24",
          data: null,
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
              { name: "User 2", isHighlighted: false },
              { name: "User 3", isHighlighted: false },
            ],
          },
          hidden: false,
        },
      ],
    },
  ],
};

const requestsData = {
  weeks: [
    {
      days: [
        {
          localDate: "2021-05-17",
          data: { requested: false },
          hidden: false,
        },
        {
          localDate: "2021-05-18",
          data: { requested: true },
          hidden: false,
        },
        {
          localDate: "2021-05-19",
          data: { requested: false },
          hidden: false,
        },
        {
          localDate: "2021-05-20",
          data: { requested: true },
          hidden: false,
        },
        {
          localDate: "2021-05-21",
          data: null,
          hidden: true,
        },
      ],
    },
    {
      days: [
        {
          localDate: "2021-05-24",
          data: null,
          hidden: true,
        },
        {
          localDate: "2021-05-25",
          data: { requested: true },
          hidden: false,
        },
        {
          localDate: "2021-05-26",
          data: { requested: false },
          hidden: false,
        },
        {
          localDate: "2021-05-27",
          data: { requested: true },
          hidden: false,
        },
        {
          localDate: "2021-05-28",
          data: { requested: false },
          hidden: false,
        },
      ],
    },
  ],
};

const reservationsData = {
  weeks: [
    {
      days: [
        {
          localDate: "2021-05-17",
          data: { userIds: ["user1", "user3"] },
          hidden: false,
        },
        {
          localDate: "2021-05-18",
          data: { userIds: [] },
          hidden: false,
        },
        {
          localDate: "2021-05-19",
          data: { userIds: [] },
          hidden: false,
        },
        {
          localDate: "2021-05-20",
          data: { userIds: [] },
          hidden: false,
        },
        {
          localDate: "2021-05-21",
          data: null,
          hidden: true,
        },
      ],
    },
    {
      days: [
        {
          localDate: "2021-05-24",
          data: null,
          hidden: true,
        },
        {
          localDate: "2021-05-25",
          data: { userIds: [] },
          hidden: false,
        },
        {
          localDate: "2021-05-26",
          data: { userIds: [] },
          hidden: false,
        },
        {
          localDate: "2021-05-27",
          data: { userIds: [] },
          hidden: false,
        },
        {
          localDate: "2021-05-28",
          data: { userIds: ["user4"] },
          hidden: false,
        },
      ],
    },
  ],
};

const reservationsUsersData = [
  { userId: "user1", name: "User 1" },
  { userId: "user2", name: "User 2" },
  { userId: "user3", name: "User 3" },
  { userId: "user4", name: "User 4" },
];

export const handlers = [
  rest.get(`${baseUrl}/overview`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ overview: overviewData }));
  }),
  rest.get(`${baseUrl}/requests`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ requests: requestsData }));
  }),
  rest.patch(`${baseUrl}/requests`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ requests: requestsData }));
  }),
  rest.get(`${baseUrl}/reservations`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        reservations: reservationsData,
        shortLeadTimeSpaces: 4,
        users: reservationsUsersData,
      })
    );
  }),
  rest.patch(`${baseUrl}/reservations`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        reservations: reservationsData,
        shortLeadTimeSpaces: 4,
        users: reservationsUsersData,
      })
    );
  }),
];
