export interface paths {
  "/Overview": {
    get: operations["Overview_Get"];
  };
  "/Profiles": {
    get: operations["Profiles_Get"];
    patch: operations["Profiles_Patch"];
  };
  "/RegistrationNumbers": {
    get: operations["RegistrationNumbers_Get"];
  };
  "/Requests": {
    get: operations["Requests_Get"];
    patch: operations["Requests_Patch"];
  };
  "/Requests/{userId}": {
    get: operations["Requests_GetById"];
    patch: operations["Requests_PatchById"];
  };
  "/Reservations": {
    get: operations["Reservations_Get"];
    patch: operations["Reservations_Patch"];
  };
  "/Status": {
    get: operations["Status_Get"];
  };
  "/Users": {
    get: operations["Users_Get"];
    post: operations["Users_Post"];
  };
  "/Users/{userId}": {
    get: operations["Users_GetById"];
    patch: operations["Users_Patch"];
  };
  "/UsersList": {
    get: operations["UsersList_Get"];
  };
}

export interface components {
  schemas: {
    OverviewResponse: {
      overview: components["schemas"]["CalendarOfOverviewData"];
    };
    CalendarOfOverviewData: {
      weeks: components["schemas"]["WeekOfOverviewData"][];
    };
    WeekOfOverviewData: {
      days: components["schemas"]["DayOfOverviewData"][];
    };
    DayOfOverviewData: {
      localDate: string;
      data?: components["schemas"]["OverviewData"] | null;
      hidden: boolean;
    };
    OverviewData: {
      allocatedUsers: components["schemas"]["OverviewUser"][];
      interruptedUsers: components["schemas"]["OverviewUser"][];
    };
    OverviewUser: {
      name: string;
      isHighlighted: boolean;
    };
    ProfileResponse: {
      profile: components["schemas"]["ProfileData"];
    };
    ProfileData: {
      registrationNumber?: string | null;
      alternativeRegistrationNumber?: string | null;
    };
    ProfilePatchRequest: {
      alternativeRegistrationNumber?: string | null;
      registrationNumber?: string | null;
    };
    RegistrationNumbersResponse: {
      registrationNumbers: components["schemas"]["RegistrationNumbersData"][];
    };
    RegistrationNumbersData: {
      registrationNumber: string;
      name: string;
    };
    RequestsResponse: {
      requests: components["schemas"]["CalendarOfRequestsData"];
    };
    CalendarOfRequestsData: {
      weeks: components["schemas"]["WeekOfRequestsData"][];
    };
    WeekOfRequestsData: {
      days: components["schemas"]["DayOfRequestsData"][];
    };
    DayOfRequestsData: {
      localDate: string;
      data?: components["schemas"]["RequestsData"] | null;
      hidden: boolean;
    };
    RequestsData: {
      requested: boolean;
    };
    ProblemDetails: {
      type?: string | null;
      title?: string | null;
      status?: number | null;
      detail?: string | null;
      instance?: string | null;
      extensions?: { [key: string]: any } | null;
    } & { [key: string]: { [key: string]: any } | null };
    RequestsPatchRequest: {
      requests: components["schemas"]["RequestsPatchRequestDailyData"][];
    };
    RequestsPatchRequestDailyData: {
      localDate: string;
      requested: boolean;
    };
    ReservationsResponse: {
      reservations: components["schemas"]["CalendarOfReservationsData"];
      shortLeadTimeSpaces: number;
      users: components["schemas"]["ReservationsUser"][];
    };
    CalendarOfReservationsData: {
      weeks: components["schemas"]["WeekOfReservationsData"][];
    };
    WeekOfReservationsData: {
      days: components["schemas"]["DayOfReservationsData"][];
    };
    DayOfReservationsData: {
      localDate: string;
      data?: components["schemas"]["ReservationsData"] | null;
      hidden: boolean;
    };
    ReservationsData: {
      userIds: string[];
    };
    ReservationsUser: {
      userId: string;
      name: string;
    };
    ReservationsPatchRequest: {
      reservations: components["schemas"]["ReservationsPatchRequestDailyData"][];
    };
    ReservationsPatchRequestDailyData: {
      localDate: string;
      userIds: string[];
    };
    MultipleUsersResponse: {
      users: components["schemas"]["UsersData"][];
    };
    UsersData: {
      userId: string;
      alternativeRegistrationNumber?: string | null;
      commuteDistance?: number | null;
      firstName: string;
      lastName: string;
      registrationNumber?: string | null;
    };
    SingleUserResponse: {
      user: components["schemas"]["UsersData"];
    };
    UserPostRequest: {
      alternativeRegistrationNumber?: string | null;
      commuteDistance?: number | null;
      emailAddress: string;
      firstName: string;
      lastName: string;
      registrationNumber?: string | null;
    };
    UserPatchRequest: {
      alternativeRegistrationNumber?: string | null;
      commuteDistance?: number | null;
      firstName: string;
      lastName: string;
      registrationNumber?: string | null;
    };
    UsersListResponse: {
      users: components["schemas"]["UsersListUser"][];
    };
    UsersListUser: {
      userId: string;
      name: string;
    };
  };
}

export interface operations {
  Overview_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OverviewResponse"];
        };
      };
    };
  };
  Profiles_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ProfileResponse"];
        };
      };
    };
  };
  Profiles_Patch: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ProfileResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProfilePatchRequest"];
      };
    };
  };
  RegistrationNumbers_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RegistrationNumbersResponse"];
        };
      };
    };
  };
  Requests_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RequestsResponse"];
        };
      };
    };
  };
  Requests_Patch: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RequestsResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RequestsPatchRequest"];
      };
    };
  };
  Requests_GetById: {
    parameters: {
      path: {
        userId: string | null;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RequestsResponse"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  Requests_PatchById: {
    parameters: {
      path: {
        userId: string | null;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RequestsResponse"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RequestsPatchRequest"];
      };
    };
  };
  Reservations_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ReservationsResponse"];
        };
      };
    };
  };
  Reservations_Patch: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ReservationsResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ReservationsPatchRequest"];
      };
    };
  };
  Status_Get: {
    responses: {
      200: unknown;
    };
  };
  Users_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["MultipleUsersResponse"];
        };
      };
    };
  };
  Users_Post: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["SingleUserResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPostRequest"];
      };
    };
  };
  Users_GetById: {
    parameters: {
      path: {
        userId: string | null;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["SingleUserResponse"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  Users_Patch: {
    parameters: {
      path: {
        userId: string | null;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["SingleUserResponse"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPatchRequest"];
      };
    };
  };
  UsersList_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UsersListResponse"];
        };
      };
    };
  };
}
