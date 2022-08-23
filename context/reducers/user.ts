export function user(state: any, action: any) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    case "LOGGED_OUT_USER":
      return { ...state, user: { auth: false, data: {} } };
    case "PREMIUM_STATUS":
      return { ...state, premium: action.payload };
    case "WITHOUT_PREMIUM":
      return {
        ...state,
        premium: {
          autoPayment: false,
          tariff: "",
          unactivate: 0,
        },
      };
    default:
      return state;
  }
}
