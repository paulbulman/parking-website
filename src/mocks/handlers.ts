import { rest } from "msw";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

let stayInterruptedIsSet = false;

const getDailyDetailsData = (stayInterruptedIsSet: boolean) => [
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
      pendingUsers: [],
      stayInterruptedStatus: {
        isAllowed: true,
        isSet: stayInterruptedIsSet,
      },
    },
  },
  {
    localDate: "2021-05-18",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
  {
    localDate: "2021-05-19",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
  {
    localDate: "2021-05-20",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
  {
    localDate: "2021-05-25",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
  {
    localDate: "2021-05-26",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
  {
    localDate: "2021-05-27",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
  {
    localDate: "2021-05-28",
    data: {
      allocatedUsers: [],
      interruptedUsers: [],
      pendingUsers: [
        { name: "User 1", isHighlighted: false },
        { name: "User 2", isHighlighted: false },
        { name: "User 3", isHighlighted: false },
        { name: "User 4", isHighlighted: true },
      ],
      stayInterruptedStatus: { isAllowed: false, isSet: false },
    },
  },
];

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

const registrationNumbersData = [
  {
    registrationNumber: "AB123CDE",
    name: "John Doe",
  },
];

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

const summaryData = {
  weeks: [
    {
      days: [
        {
          localDate: "2021-05-17",
          data: { status: "hardInterrupted", isProblem: true },
          hidden: false,
        },
        {
          localDate: "2021-05-18",
          data: { status: "allocated", isProblem: false },
          hidden: false,
        },
        {
          localDate: "2021-05-19",
          data: { status: "interrupted", isProblem: true },
          hidden: false,
        },
        {
          localDate: "2021-05-20",
          data: { status: null, isProblem: false },
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
          data: { status: "allocated", isProblem: false },
          hidden: false,
        },
        {
          localDate: "2021-05-26",
          data: { status: "allocated", isProblem: false },
          hidden: false,
        },
        {
          localDate: "2021-05-27",
          data: { status: "pending", isProblem: false },
          hidden: false,
        },
        {
          localDate: "2021-05-28",
          data: { status: "pending", isProblem: false },
          hidden: false,
        },
      ],
    },
  ],
};

const usersData = [
  {
    userId: 1,
    alternativeRegistrationNumber: "X123XYZ",
    commuteDistance: 2,
    firstName: "John",
    lastName: "Doe",
    registrationNumber: "AB123CDE",
    requestReminderEnabled: true,
    reservationReminderEnabled: false,
  },
  {
    userId: 2,
    alternativeRegistrationNumber: "A789ABC",
    commuteDistance: 3,
    firstName: "Ann",
    lastName: "Other",
    registrationNumber: "XY789XYZ",
    requestReminderEnabled: false,
    reservationReminderEnabled: true,
  },
];

const usersListData = [
  { userId: 1, name: "John Doe" },
  { userId: 2, name: "Ann Other" },
];

const getUser = (userId: string) => {
  const user = usersData[0];
  return { ...user, userId };
};

const getProfile = () => {
  const user = usersData[0];
  return {
    registrationNumber: user.registrationNumber,
    alternativeRegistrationNumber: user.alternativeRegistrationNumber,
    requestReminderEnabled: user.requestReminderEnabled,
    reservationReminderEnabled: user.reservationReminderEnabled,
  };
};

export const handlers = [
  rest.get(`${baseUrl}/dailyDetails`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({ details: getDailyDetailsData(stayInterruptedIsSet) })
    );
  }),

  rest.get(`${baseUrl}/overview`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ overview: overviewData }));
  }),

  rest.get(`${baseUrl}/profiles`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ profile: getProfile() }));
  }),
  rest.patch(`${baseUrl}/profiles`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ profile: getProfile() }));
  }),

  rest.get(`${baseUrl}/registrationNumbers/:searchString`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        registrationNumbers: registrationNumbersData.filter(
          (data) => data.registrationNumber === req.params["searchString"]
        ),
      })
    );
  }),

  rest.get(`${baseUrl}/requests`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ requests: requestsData }));
  }),
  rest.patch(`${baseUrl}/requests`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ requests: requestsData }));
  }),

  rest.get(`${baseUrl}/requests/:userId`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ requests: requestsData }));
  }),
  rest.patch(`${baseUrl}/requests/:userId`, (req, res, ctx) => {
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

  rest.patch(`${baseUrl}/stayInterrupted`, (req, res, ctx) => {
    stayInterruptedIsSet = !stayInterruptedIsSet;
    return res(
      ctx.delay(500),
      ctx.json({ details: getDailyDetailsData(stayInterruptedIsSet) })
    );
  }),

  rest.get(`${baseUrl}/summary`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ summary: summaryData }));
  }),

  rest.get(`${baseUrl}/users`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ users: usersData }));
  }),
  rest.post(`${baseUrl}/users`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json(usersData[0]));
  }),

  rest.get(`${baseUrl}/users/:userId`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ user: getUser(req.params.userId) }));
  }),
  rest.patch(`${baseUrl}/users/:userId`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ user: getUser(req.params.userId) }));
  }),

  rest.get(`${baseUrl}/usersList`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({ users: usersListData }));
  }),
];
