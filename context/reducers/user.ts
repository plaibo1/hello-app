import { StateSchema, ActionSchema } from "../index";

export function user(state: StateSchema, action: ActionSchema) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "LOGGED_OUT_USER":
      return { ...state, user: { auth: false, data: {}, premium: {} } };
    case "PREMIUM_STATUS":
      return { ...state, user: { ...state.user, premium: action.payload } };
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
