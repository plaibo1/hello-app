import { useState, useEffect, useReducer, createContext } from "react";
import { user } from "./reducers/user";
import { LoginSchema } from "../services/user";
import { signIn, signOut, getSelfInfo } from "../services/user.service";

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
  console.log(initialProps);
  const [state, dispatch] = useReducer(combineReducers(user), initialProps); // pass more reducers combineReducers(user, blogs, products)

  const login = async ({ phone, password }: LoginSchema) => {
    return signIn({ phone, password })
      .then((userData) => {
        return getSelfInfo()
          .then((userInfo) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: { auth: true, data: userInfo },
            });
            console.log(userData);
            console.log(userInfo);
          })
          .catch((error) => Promise.reject(error));
      })
      .catch((error) => Promise.reject(error));
  };

  const logout = async () => {
    return signOut()
      .then(() => {
        dispatch({ type: "LOGGED_OUT_USER" });
      })
      .catch((error) => Promise.reject(error));
  };

  const value = { state, dispatch, login, logout };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
