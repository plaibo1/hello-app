import { useCallback, useReducer, createContext } from "react";
import { user } from "./reducers/user";
import { LoginSchema, CodeConfirmSchema } from "../services/user";
import { useRouter } from "next/router";
import {
  signIn,
  signOut,
  getSelfInfo,
  codeConfirm as _codeConfirm,
  startTrial as _startTrial,
  selfStatus as _selfStatus,
  changeTariff as _changeTariff,
  cancelTariff as _cancelTariff,
} from "../services/user.service";

interface UserSchema {
  user: {
    auth: boolean;
    data: Record<string, any>;
  };
}

// initial state
const initialState: any = {
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

// combine reducer function
const combineReducers =
  (...reducers: any[]) =>
  (state: any, action: any) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children, initialProps = initialState }: any) => {
  const { push } = useRouter();
  const [state, dispatch] = useReducer(combineReducers(user), initialProps); // pass more reducers combineReducers(user, blogs, products)

  const login = useCallback(
    async ({ phone, password }: LoginSchema) => {
      return signIn({ phone, password })
        .then((userData) => {
          return getSelfInfo()
            .then((userInfo) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: { auth: true, data: userInfo },
              });
              if (userInfo.premium) {
                return _selfStatus().then((premiumInfo) => {
                  dispatch({
                    type: "PREMIUM_STATUS",
                    payload: premiumInfo,
                  });
                  push("/account");
                  return premiumInfo;
                });
              }
              push("/premium");
              return userInfo;
            })
            .catch((error) => Promise.reject(error));
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
              payload: { auth: true, data: userInfo },
            });
            if (userInfo.premium) {
              return _selfStatus().then((premiumInfo) => {
                dispatch({
                  type: "PREMIUM_STATUS",
                  payload: premiumInfo,
                });
                return premiumInfo;
              });
            }
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
              payload: { auth: true, data: userInfo },
            });
            return _selfStatus().then((premiumInfo) => {
              dispatch({
                type: "PREMIUM_STATUS",
                payload: premiumInfo,
              });
              push("/account");
              return premiumInfo;
            });
          })
          .catch((error) => Promise.reject(error));
      })
      .catch((error) => Promise.reject(error));
  }, [push]);

  const changeTariff = useCallback(async (tariff: string) => {
    return _changeTariff(tariff)
      .then((userData) => {
        push("/account");
        return getSelfInfo()
          .then((userInfo) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: { auth: true, data: userInfo },
            });
            return _selfStatus().then((premiumInfo) => {
              dispatch({
                type: "PREMIUM_STATUS",
                payload: premiumInfo,
              });
              return premiumInfo;
            });
          })
          .catch((error) => Promise.reject(error));
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
              payload: { auth: true, data: userInfo },
            });
            return _selfStatus().then((premiumInfo) => {
              dispatch({
                type: "PREMIUM_STATUS",
                payload: premiumInfo,
              });
              return premiumInfo;
            });
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
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
