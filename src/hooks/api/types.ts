export interface paths {
  "/DailyDetails": {
    get: operations["DailyDetails_Get"];
  };
  "/StayInterrupted": {
    patch: operations["DailyDetails_Patch"];
  };
  "/History": {
    get: operations["History_Get"];
  };
  "/Overview": {
    get: operations["Overview_Get"];
  };
  "/Profiles": {
    get: operations["Profiles_Get"];
    patch: operations["Profiles_Patch"];
  };
  "/RegistrationNumbers/{searchString}": {
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
  "/Summary": {
    get: operations["Summary_GetSummary"];
  };
  "/Triggers": {
    post: operations["Triggers_Post"];
  };
  "/Users": {
    get: operations["Users_Get"];
    post: operations["Users_Post"];
  };
  "/Users/{userId}": {
    get: operations["Users_GetById"];
    delete: operations["Users_Delete"];
    patch: operations["Users_Patch"];
  };
  "/UsersList": {
    get: operations["UsersList_Get"];
  };
}

export interface components {
  schemas: {
    DailyDetailsResponse: {
      details: components["schemas"]["DayOfDailyDetailsData"][];
    };
    DayOfDailyDetailsData: {
      /** Format: date */
      localDate: string;
      data?: components["schemas"]["DailyDetailsData"] | null;
      hidden: boolean;
    };
    DailyDetailsData: {
      allocatedUsers: components["schemas"]["DailyDetailsUser"][];
      interruptedUsers: components["schemas"]["DailyDetailsUser"][];
      pendingUsers: components["schemas"]["DailyDetailsUser"][];
      stayInterruptedStatus: components["schemas"]["StayInterruptedStatus"];
    };
    DailyDetailsUser: {
      name: string;
      isHighlighted: boolean;
    };
    StayInterruptedStatus: {
      isAllowed: boolean;
      isSet: boolean;
    };
    ProblemDetails: {
      type?: string | null;
      title?: string | null;
      /** Format: int32 */
      status?: number | null;
      detail?: string | null;
      instance?: string | null;
      extensions?: { [key: string]: unknown };
    } & { [key: string]: unknown | null };
    StayInterruptedPatchRequest: {
      /** Format: date */
      localDate: string;
      stayInterrupted: boolean;
    };
    HistoryResponse: {
      history: components["schemas"]["CalendarOfString"];
      /** Format: int32 */
      totalContestedRequestsCount: number;
      /** Format: int32 */
      allocatedContestedRequestsCount: number;
      /** Format: decimal */
      allocationRatio: number;
    };
    CalendarOfString: {
      weeks: components["schemas"]["WeekOfString"][];
    };
    WeekOfString: {
      days: components["schemas"]["DayOfString"][];
    };
    DayOfString: {
      /** Format: date */
      localDate: string;
      data?: string | null;
      hidden: boolean;
    };
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
      /** Format: date */
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
      requestReminderEnabled: boolean;
      reservationReminderEnabled: boolean;
    };
    ProfilePatchRequest: {
      alternativeRegistrationNumber?: string | null;
      registrationNumber?: string | null;
      requestReminderEnabled?: boolean | null;
      reservationReminderEnabled?: boolean | null;
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
      /** Format: date */
      localDate: string;
      data?: components["schemas"]["RequestsData"] | null;
      hidden: boolean;
    };
    RequestsData: {
      requested: boolean;
    };
    RequestsPatchRequest: {
      requests: components["schemas"]["RequestsPatchRequestDailyData"][];
    };
    RequestsPatchRequestDailyData: {
      /** Format: date */
      localDate: string;
      requested: boolean;
    };
    ReservationsResponse: {
      reservations: components["schemas"]["CalendarOfReservationsData"];
      /** Format: int32 */
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
      /** Format: date */
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
      /** Format: date */
      localDate: string;
      userIds: string[];
    };
    SummaryResponse: {
      summary: components["schemas"]["CalendarOfSummaryData"];
    };
    CalendarOfSummaryData: {
      weeks: components["schemas"]["WeekOfSummaryData"][];
    };
    WeekOfSummaryData: {
      days: components["schemas"]["DayOfSummaryData"][];
    };
    DayOfSummaryData: {
      /** Format: date */
      localDate: string;
      data?: components["schemas"]["SummaryData"] | null;
      hidden: boolean;
    };
    SummaryData: {
      status?: components["schemas"]["SummaryStatus"] | null;
      isProblem: boolean;
    };
    SummaryStatus: "allocated" | "hardInterrupted" | "interrupted" | "pending";
    MultipleUsersResponse: {
      users: components["schemas"]["UsersData"][];
    };
    UsersData: {
      userId: string;
      alternativeRegistrationNumber?: string | null;
      /** Format: decimal */
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
      /** Format: decimal */
      commuteDistance?: number | null;
      emailAddress: string;
      firstName: string;
      lastName: string;
      registrationNumber?: string | null;
    };
    UserPatchRequest: {
      alternativeRegistrationNumber?: string | null;
      /** Format: decimal */
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
  DailyDetails_Get: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["DailyDetailsResponse"];
        };
      };
    };
  };
  DailyDetails_Patch: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["DailyDetailsResponse"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
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
        "application/json": components["schemas"]["StayInterruptedPatchRequest"];
      };
    };
  };
  History_Get: {
    parameters: {
      query: {
        userId: string | null;
        lastDate: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["HistoryResponse"];
        };
      };
    };
  };
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
    parameters: {
      path: {
        searchString: string;
      };
    };
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
        userId: string;
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
        userId: string;
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
  Summary_GetSummary: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["SummaryResponse"];
        };
      };
    };
  };
  Triggers_Post: {
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
        userId: string;
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
  Users_Delete: {
    parameters: {
      path: {
        userId: string;
      };
    };
    responses: {
      204: never;
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
        userId: string;
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
