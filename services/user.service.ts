import {
  LoginSchema,
  PhoneSchema,
  CodeConfirmSchema,
  NewPasswordScheme,
} from "./user.d";
import * as cookie from "cookie";
import { apiClient } from "./api";

const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

export const signIn = async ({ password, phone }: LoginSchema) => {
  return apiClient
    .post(`${baseUrl}/auth/signIn`, {
      phone,
      password,
      web: true,
    })
    .then((res) => {
      document.cookie = `access_token=${res.data.response.credentials.access_token}`;
      document.cookie = `refresh_token=${res.data.response.credentials.refresh_token}`;
      return res.data.response;
    });
};

export const signOut = (token?: string) => {
  return apiClient
    .get(`${baseUrl}/api/signOut`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token),
      },
    })
    .then((res) => {
      document.cookie = `access_token=`;
      document.cookie = `refresh_token=`;
      return res.data.response;
    });
};

export const restorePassword = (phone: PhoneSchema) => {
  return apiClient
    .post(`${baseUrl}/auth/restore`, {
      phone: { ...phone },
      web: true,
    })
    .then((res) => {
      return res.data.response;
    });
};

export const codeConfirm = (body: CodeConfirmSchema) => {
  return apiClient
    .post(`${baseUrl}/auth/codeConfirm`, {
      code: body.code,
      confirmType: body.confirmType,
      phone: body.phone,
      web: true,
    })
    .then((res) => {
      document.cookie = `access_token=${res.data.response.credentials.access_token}`;
      document.cookie = `refresh_token=${res.data.response.credentials.refresh_token}`;
      return res.data.response;
    });
};

export const newPassword = (body: NewPasswordScheme) => {
  return apiClient
    .post(
      `${baseUrl}/api/newPassword`,
      {
        newPassword: body.newPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
        },
      }
    )
    .then((res) => {
      return res.data.response;
    });
};

export const getSelfInfo = async (token?: string) => {
  return apiClient
    .get(`${baseUrl}/web/pay/selfStatus`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token),
      },
    })
    .then((res) => {
      return res.data.response;
    })
    .catch((error) => {
      document.cookie = `access_token=`;
      document.cookie = `refresh_token=`;
      return Promise.reject(error);
    });
};

export const startTrial = async () => {
  return apiClient
    .get(`${baseUrl}/web/pay/startTrial`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
      },
    })
    .then((res) => {
      return res.data.response;
    });
};

export const changeTariff = async (tariff: string) => {
  return apiClient
    .post(
      `${baseUrl}/web/pay/changeTariff`,
      {
        tariff,
      },
      {
        headers: {
          Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
        },
      }
    )
    .then((res) => {
      return res.data.response;
    });
};

export const tariffPayment = async (tariff: string) => {
  return apiClient
    .post(
      `${baseUrl}/web/pay/tariffPayment`,
      {
        tariff,
      },
      {
        headers: {
          Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
        },
      }
    )
    .then((res) => {
      return res.data.response;
    });
};

export const refreshToken = async () => {
  return apiClient
    .post(`${baseUrl}/auth/refresh`, {
      refresh_token: cookie.parse(document.cookie).refresh_token,
      web: true,
    })
    .then((res) => {
      document.cookie = `access_token=${res.data.response.access_token}`;
      document.cookie = `refresh_token=${res.data.response.refresh_token}`;
      return res.data.response;
    });
};

export const cancelTariff = async () => {
  return apiClient
    .get(`${baseUrl}/web/pay/cancelTariff`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
      },
    })
    .then((res) => {
      return res.data.response;
    });
};

export const getBindCardUrl = async () => {
  return apiClient
    .get(`${baseUrl}/web/pay/bindCard`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
      },
    })
    .then((res) => {
      return res.data.response;
    });
};
