import * as cookie from "cookie";
import { getSelfInfo } from "../services";

const accessLinks = {
  withPremium: {
    access: ["/account", "/tariff"],
    redirect: "/account",
  },
  withoutPremium: {
    access: ["/premium"],
    redirect: "/premium",
  },
  withoutLogin: {
    access: ["/", "/premium", "/login", "/recovery"],
    redirect: "/login",
  },
};

export const redirect = (page: string, profileStatus: any, res: any) => {
  const statusObject = (accessLinks as any)[profileStatus];
  if (!statusObject.access.includes(page)) {
    res.setHeader("location", statusObject.redirect);
    res.statusCode = 302;
    res.end();
  }
};

export const checkAuth = async (req: any, res: any, query: string) => {
  let initialState = {
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
  let profileStatus = "withoutLogin";
  const page = query.split("?")[0];
  if (req.headers.cookie && cookie.parse(req.headers.cookie).access_token) {
    try {
      const userInfo = await getSelfInfo(
        cookie.parse(req.headers.cookie).access_token
      );
      initialState.user.auth = true;
      initialState.user.data = userInfo.selfProfile;
      initialState.user.premium = userInfo.premiumStatus;
    } catch (error) {}
  }

  if (initialState.user.auth) {
    if (
      (initialState.user.data && (initialState.user.data as any).premium) ||
      (initialState.user.data as any).trial
    ) {
      profileStatus = "withPremium";
    } else {
      profileStatus = "withoutPremium";
    }
  }
  redirect(page, profileStatus, res);

  return {
    props: { initialState },
  };
};
