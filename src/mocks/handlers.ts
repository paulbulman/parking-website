import { HttpResponse, delay, http } from "msw";

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
  http.get(`${baseUrl}/dailyDetails`, async () => {
    await delay(500);
    return HttpResponse.json({
      details: getDailyDetailsData(stayInterruptedIsSet),
    });
  }),

  http.get(`${baseUrl}/overview`, async () => {
    await delay(500);
    return HttpResponse.json({ overview: overviewData });
  }),

  http.get(`${baseUrl}/profiles`, async () => {
    await delay(500);
    return HttpResponse.json({ profile: getProfile() });
  }),
  http.patch(`${baseUrl}/profiles`, async () => {
    await delay(500);
    return HttpResponse.json({ profile: getProfile() });
  }),

  http.get(
    `${baseUrl}/registrationNumbers/:searchString`,
    async ({ params }) => {
      await delay(500);

      const { searchString } = params;
      const registrationNumbers = registrationNumbersData.filter(
        (data) => data.registrationNumber === searchString
      );
      return HttpResponse.json({ registrationNumbers });
    }
  ),

  http.get(`${baseUrl}/requests`, async () => {
    await delay(500);
    return HttpResponse.json({ requests: requestsData });
  }),
  http.patch(`${baseUrl}/requests`, async () => {
    await delay(500);
    return HttpResponse.json({ requests: requestsData });
  }),

  http.get(`${baseUrl}/requests/:userId`, async () => {
    await delay(500);
    return HttpResponse.json({ requests: requestsData });
  }),
  http.patch(`${baseUrl}/requests/:userId`, async () => {
    await delay(500);
    return HttpResponse.json({ requests: requestsData });
  }),

  http.get(`${baseUrl}/reservations`, async () => {
    await delay(500);
    return HttpResponse.json({
      reservations: reservationsData,
      shortLeadTimeSpaces: 4,
      users: reservationsUsersData,
    });
  }),
  http.patch(`${baseUrl}/reservations`, async () => {
    await delay(500);
    return HttpResponse.json({
      reservations: reservationsData,
      shortLeadTimeSpaces: 4,
      users: reservationsUsersData,
    });
  }),

  http.patch(`${baseUrl}/stayInterrupted`, async () => {
    await delay(500);
    stayInterruptedIsSet = !stayInterruptedIsSet;
    return HttpResponse.json({
      details: getDailyDetailsData(stayInterruptedIsSet),
    });
  }),

  http.get(`${baseUrl}/summary`, async () => {
    await delay(500);
    return HttpResponse.json({ summary: summaryData });
  }),

  http.get(`${baseUrl}/users`, async () => {
    await delay(500);
    return HttpResponse.json({ users: usersData });
  }),
  http.post(`${baseUrl}/users`, async () => {
    await delay(500);
    return HttpResponse.json(usersData[0]);
  }),

  http.get(`${baseUrl}/users/:userId`, async ({ params }) => {
    await delay(500);
    const { userId } = params;
    return HttpResponse.json({ user: getUser(userId[0]) });
  }),
  http.patch(`${baseUrl}/users/:userId`, async ({ params }) => {
    await delay(500);
    const { userId } = params;
    return HttpResponse.json({ user: getUser(userId[0]) });
  }),
  http.delete(`${baseUrl}/users/:userId`, async () => {
    await delay(500);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(`${baseUrl}/usersList`, async () => {
    await delay(500);
    return HttpResponse.json({ users: usersListData });
  }),
];
