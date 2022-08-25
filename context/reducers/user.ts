export function user(state: any, action: any) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "LOGGED_OUT_USER":
      return { ...state, user: { auth: false, data: {}, premium: {} } };
    case "PREMIUM_STATUS":
      return { ...state, user: { ...state.user, premium: action.payload } };
    case "LOADING_TRUE":
      return { ...state, isLoading: true };
    case "LOADING_FALSE":
      return { ...state, isLoading: false };
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
