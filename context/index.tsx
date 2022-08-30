import { useCallback, useReducer, createContext, ReactNode } from "react";
import { user } from "./reducers/user";
import { LoginSchema, CodeConfirmSchema } from "../services/user";
import { useRouter } from "next/router";
import {
  signIn,
  signOut,
  getSelfInfo,
  codeConfirm as _codeConfirm,
  startTrial as _startTrial,
  changeTariff as _changeTariff,
  cancelTariff as _cancelTariff,
  tariffPayment as _tariffPayment,
} from "../services/user.service";

export interface UserSchema {
  auth: boolean;
  data: Record<string, any>;
  premium: Record<string, any> | undefined;
}

export interface StateSchema {
  user: UserSchema;
}

export interface ActionSchema {
  type: string;
  payload?: UserSchema | Record<string, any>;
}

// initial state
const initialState: StateSchema = {
  user: {
    auth: false,
    data: {},
    premium: {
      autoPayment: false,
      tariff: "",
      unactivate: 0,
    },
  },
};

// create context
const Context = createContext({});

type ReducersSchema = (state: StateSchema, action: ActionSchema) => StateSchema;

// combine reducer function
const combineReducers =
  (...reducers: ReducersSchema[]) =>
  (state: StateSchema, action: ActionSchema) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

interface ProviderSchema {
  children: ReactNode;
  initialProps: StateSchema;
}

// context provider
const Provider = ({
  children,
  initialProps = initialState,
}: ProviderSchema) => {
  const { push } = useRouter();
  const [state, dispatch] = useReducer(combineReducers(user), initialProps); // pass more reducers combineReducers(user, blogs, products)

  const login = useCallback(
    async (
      { phone, password }: LoginSchema,
      start_trial?: boolean,
      tariff?: string
    ) => {
      return signIn({ phone, password })
        .then((userData) => {
          if (start_trial) {
            return getSelfInfo()
              .then((userInfo) => {
                if (
                  !userInfo.selfProfile.premium &&
                  !userInfo.selfProfile.trial
                ) {
                  return startTrial()
                    .then(() => {
                      return changeTariff(tariff || "")
                        .then(() => {
                          push({
                            pathname: "/account",
                            query: { show_modal: true },
                          });
                        })
                        .catch((error) => Promise.reject(error));
                    })
                    .catch((error) => Promise.reject(error));
                } else {
                  push({
                    pathname: "/account",
                  });
                  return userInfo;
                }
              })
              .catch((error) => Promise.reject(error));
          } else {
            return getSelfInfo()
              .then((userInfo) => {
                const redirect_link = `${
                  userInfo.selfProfile.premium || userInfo.selfProfile.trial
                    ? "/account"
                    : "/premium"
                }`;
                dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                    auth: true,
                    data: userInfo.selfProfile,
                    premium: userInfo.premiumStatus,
                  },
                });
                push(redirect_link);
                return userInfo;
              })
              .catch((error) => Promise.reject(error));
          }
        })
        .catch((error) => Promise.reject(error));
    },
    [push]
  );

  const logout = useCallback(async () => {
    return signOut()
      .then(() => {
        push("/");
        dispatch({ type: "LOGGED_OUT_USER" });
      })
      .catch((error) => Promise.reject(error));
  }, [push]);

  const codeConfirm = useCallback(async (body: CodeConfirmSchema) => {
    return _codeConfirm(body)
      .then((userData) => {
        return getSelfInfo()
          .then((userInfo) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                auth: true,
                data: userInfo.selfProfile,
                premium: userInfo.premiumStatus,
              },
            });
            return userInfo;
          })
          .catch((error) => Promise.reject(error));
      })
      .catch((error) => Promise.reject(error));
  }, []);

  const startTrial = useCallback(async () => {
    return _startTrial()
      .then((userData) => {
        return getSelfInfo()
          .then((userInfo) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                auth: true,
                data: userInfo.selfProfile,
                premium: userInfo.premiumStatus,
              },
            });
            return userInfo;
          })
          .catch((error) => Promise.reject(error));
      })
      .catch((error) => Promise.reject(error));
  }, []);

  const changeTariff = useCallback(async (tariff: string) => {
    return _changeTariff(tariff)
      .then((userData) => {
        push("/account");
        return getSelfInfo()
          .then((userInfo) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                auth: true,
                data: userInfo.selfProfile,
                premium: userInfo.premiumStatus,
              },
            });
            return userInfo;
          })
          .catch((error) => Promise.reject(error));
      })
      .catch((error) => Promise.reject(error));
  }, []);

  const tariffPayment = useCallback(async (tariff: string) => {
    return _tariffPayment(tariff)
      .then((paymentUrl) => {
        return paymentUrl;
      })
      .catch((error) => Promise.reject(error));
  }, []);

  const cancelTariff = useCallback(async (tariff: string) => {
    return _cancelTariff()
      .then((userData) => {
        return getSelfInfo()
          .then((userInfo) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                auth: true,
                data: userInfo.selfProfile,
                premium: userInfo.premiumStatus,
              },
            });
            return userInfo;
          })
          .catch((error) => Promise.reject(error));
      })
      .catch((error) => Promise.reject(error));
  }, []);

  const value = {
    state,
    dispatch,
    login,
    logout,
    codeConfirm,
    startTrial,
    changeTariff,
    cancelTariff,
    tariffPayment,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
