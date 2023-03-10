import { Autoplay } from "swiper";
import { accessLinks } from "constants/access";
import { StateSchema } from "context";
import * as cookie from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import { getSelfInfo } from "../services";

export const redirect = (
  page: string,
  profileStatus: string,
  res: ServerResponse,
  locale: string
) => {
  const statusObject = accessLinks[profileStatus];

  if (!statusObject.access.includes(page)) {
    res.setHeader("location", `/${locale}/${statusObject.redirect}`);
    res.statusCode = 302;
    res.end();
  }
};

export const checkAuth = async (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
  res: ServerResponse,
  query: string,
  locale: string = "en",
) => {
  let initialState: StateSchema = {
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
    } catch (error) {
      console.log(error);
    }
  }

  if (initialState.user.auth) {
    if (
      (initialState.user.data && initialState.user.data.premium) ||
      initialState.user.data.trial
    ) {
      if (
        initialState.user.data.trial &&
        !initialState.user.premium?.autoPayment &&
        initialState.user.premium?.unactivate === 0
      ) {
        profileStatus = "withoutPremium";
      } else {
        profileStatus = "withPremium";
      }
    } else {
      profileStatus = "withoutPremium";
    }
  }
  redirect(page, profileStatus, res, locale);

  return {
    props: { initialState },
  };
};
