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
    .post(`${baseUrl}/api/auth/session`, {
      phone,
      password,
      web: true,
    })
    .then((res) => {
      document.cookie = `access_token=${res.data.response.credentials.access_token}; path=/;`;
      document.cookie = `refresh_token=${res.data.response.credentials.refresh_token}; path=/;`;
      return res.data.response;
    });
};

export const signOut = async (token?: string) => {
  return await apiClient
    .delete(`${baseUrl}/api/auth/session`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token),
      },
    })
    .then((res) => {
      document.cookie = `access_token=; path=/;`;
      document.cookie = `refresh_token=; path=/;`;
      return res.data.response;
    });
};

export const restorePassword = (phone: PhoneSchema) => {
  return apiClient
    .post(`${baseUrl}/api/auth/restore`, {
      phone: { ...phone },
    })
    .then((res) => {
      return res.data.response;
    });
};

export const codeConfirm = async (body: CodeConfirmSchema) => {
  return await apiClient
    .post(`${baseUrl}/api/auth/codeConfirm`, {
      code: body.code,
      confirmType: body.confirmType,
      phone: body.phone,
      web: true,
    })
    .then((res) => {
      document.cookie = `access_token=${res.data.response.credentials.access_token}; path=/;`;
      document.cookie = `refresh_token=${res.data.response.credentials.refresh_token}; path=/;`;
      return res.data.response;
    });
};

export const newPassword = async (body: NewPasswordScheme) => {
  return await apiClient
    .patch(
      `${baseUrl}/api/user/password`,
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
  return await apiClient
    .get(`${baseUrl}/api/pay/tariff`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token),
      },
    })
    .then((res) => {
      return res.data.response;
    })
    .catch((error) => {
      document.cookie = `access_token=; path=/;`;
      document.cookie = `refresh_token=; path=/;`;
      return Promise.reject(error);
    });
};

export const startTrial = async (deferTariff?: string) => {
  return await apiClient
    .post(
      `${baseUrl}/api/pay/trial`,
      {
        tariff: deferTariff,
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

export const changeTariff = async (tariff: string) => {
  return await apiClient
    .put(
      `${baseUrl}/api/pay/tariff`,
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
  // console.log("tariffPayment", tariff);
  return await apiClient
    .post(
      `${baseUrl}/api/pay/url/tariff`,
      {
        tariff
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
  return await apiClient
    .put(`${baseUrl}/api/auth/session`, {
      refresh_token: cookie.parse(document.cookie).refresh_token,
      web: true,
    })
    .then((res) => {
      document.cookie = `access_token=${res.data.response.access_token}; path=/;`;
      document.cookie = `refresh_token=${res.data.response.refresh_token}; path=/;`;
      return res.data.response;
    });
};

export const cancelTariff = async () => {
  return await apiClient
    .delete(`${baseUrl}/api/pay/tariff`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
      },
    })
    .then((res) => {
      return res.data.response;
    });
};

export const getBindCardUrl = async () => {
  return await apiClient
    .get(`${baseUrl}/api/pay/url/bindCard`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token,
      },
    })
    .then((res) => {
      return res.data.response;
    });
};
