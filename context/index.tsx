import { useCallback, useReducer, createContext, ReactNode } from "react";
import { user } from "./reducers/user";
import { LoginSchema, CodeConfirmSchema } from "../services/user";
import { useRouter } from "next/router";
import {
  signIn,
  signOut,
  getSelfInfo as _getSelfInfo,
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

  const getSelfInfo = useCallback(async () => {
    try {
      const userInfo = await _getSelfInfo();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          auth: true,
          data: userInfo.selfProfile,
          premium: userInfo.premiumStatus,
        },
      });
      return userInfo;
    } catch (error) {
      dispatch({ type: "LOGGED_OUT_USER" });
      return Promise.reject(error);
    }
  }, []);

  const startTrial = useCallback(
    async (deferTariff: string) => {
      await _startTrial(deferTariff);
      const userInfo = await getSelfInfo();
      return userInfo;
    },
    [getSelfInfo]
  );

  const changeTariff = useCallback(
    async (tariff: string) => {
      await _changeTariff(tariff);
      const userInfo = await getSelfInfo();
      push("/account");
      return userInfo;
    },
    [getSelfInfo, push]
  );

  const login = useCallback(
    async (
      { email, password }: LoginSchema,
      start_trial?: boolean,
      tariff?: string
    ) => {
      await signIn({ email, password });
      const userInfo = await getSelfInfo();

      if (start_trial) {
        if (
          tariff &&
          !userInfo.selfProfile.premium &&
          !userInfo.selfProfile.trial
        ) {
          await startTrial(tariff);
          push({
            pathname: "/account",
            query: { show_modal: true },
          });
          return userInfo;
        } else {
          push({
            pathname: "/account",
          });
          return userInfo;
        }
      } else {
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
      }
    },
    [changeTariff, getSelfInfo, push, startTrial]
  );

  const logout = useCallback(async () => {
    await signOut();
    dispatch({ type: "LOGGED_OUT_USER" });
  }, []);

  const codeConfirm = useCallback(
    async (body: CodeConfirmSchema) => {
      await _codeConfirm(body);
      const userInfo = await getSelfInfo();
      return userInfo;
    },
    [getSelfInfo]
  );

  const tariffPayment = useCallback(async (tariff: string) => {
    try {
      const paymentUrl = await _tariffPayment(tariff);
      return paymentUrl;
    }
    catch(err) {
      console.log(err)
    }
  }, []);

  const cancelTariff = useCallback(async () => {
    await _cancelTariff();
    const userInfo = getSelfInfo();
    return userInfo;
  }, [getSelfInfo]);

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
