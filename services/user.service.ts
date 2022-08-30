import {
  LoginSchema,
  PhoneSchema,
  CodeConfirmSchema,
  NewPasswordScheme,
} from "./user.d";
import * as cookie from "cookie";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

export const signIn = async ({ password, phone }: LoginSchema) => {
  return axios
    .post(
      `${baseUrl}/auth/signIn`,
      {
        phone,
        password,
        web: true,
      },
      {
        validateStatus: function (status: number) {
          return status > 199 || status < 300; // Resolve only if the status code is less than 500
        },
      }
    )
    .then((res) => {
      document.cookie = `access_token=${res.data.response.credentials.access_token}`;
      document.cookie = `refresh_token=${res.data.response.credentials.refresh_token}`;
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const signOut = (token?: string) => {
  return axios
    .get(`${baseUrl}/api/signOut`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token), //the token is a variable which holds the token
      },
      validateStatus: function (status: number) {
        return status > 199 || status < 300; // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      document.cookie = `access_token=`;
      document.cookie = `refresh_token=`;
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const restorePassword = (phone: PhoneSchema) => {
  return axios
    .post(
      `${baseUrl}/auth/restore`,
      {
        phone: { ...phone },
        web: true,
      },
      {
        validateStatus: function (status: number) {
          return status > 199 || status < 300; // Resolve only if the status code is less than 500
        },
      }
    )
    .then((res) => {
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const codeConfirm = (body: CodeConfirmSchema) => {
  return axios
    .post(
      `${baseUrl}/auth/codeConfirm`,
      {
        code: body.code,
        confirmType: body.confirmType,
        phone: body.phone,
        web: true,
      },
      {
        validateStatus: function (status: number) {
          return status > 199 || status < 300; // Resolve only if the status code is less than 500
        },
      }
    )
    .then((res) => {
      document.cookie = `access_token=${res.data.response.credentials.access_token}`;
      document.cookie = `refresh_token=${res.data.response.credentials.refresh_token}`;
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const newPassword = (body: NewPasswordScheme) => {
  return axios
    .post(
      `${baseUrl}/api/newPassword`,
      {
        newPassword: body.newPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + cookie.parse(document.cookie).access_token, //the token is a variable which holds the token
        },
        validateStatus: function (status: number) {
          return status > 199 || status < 300; // Resolve only if the status code is less than 500
        },
      }
    )
    .then((res) => {
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const getSelfInfo = async (token?: string) => {
  return axios
    .get(`${baseUrl}/web/pay/selfStatus`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token), //the token is a variable which holds the token
      },
      validateStatus: function (status: number) {
        return status >= 200 && status < 300; // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data.response;
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .catch((error) => {
      document.cookie = `access_token=`;
      document.cookie = `refresh_token=`;
      return Promise.reject(error);
    });
};

export const startTrial = async () => {
  return axios
    .get(`${baseUrl}/web/pay/startTrial`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token, //the token is a variable which holds the token
      },
      validateStatus: function (status: number) {
        return status > 199 || status < 300; // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const changeTariff = async (tariff: string) => {
  return axios
    .post(
      `${baseUrl}/web/pay/changeTariff`,
      {
        tariff,
      },
      {
        headers: {
          Authorization: "Bearer " + cookie.parse(document.cookie).access_token, //the token is a variable which holds the token
        },
        validateStatus: function (status: number) {
          return status > 199 || status < 300; // Resolve only if the status code is less than 500
        },
      }
    )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data.response;
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const tariffPayment = async (tariff: string) => {
  return axios
    .post(
      `${baseUrl}/web/pay/tariffPayment`,
      {
        tariff,
      },
      {
        headers: {
          Authorization: "Bearer " + cookie.parse(document.cookie).access_token, //the token is a variable which holds the token
        },
        validateStatus: function (status: number) {
          return status > 199 || status < 300; // Resolve only if the status code is less than 500
        },
      }
    )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data.response;
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const cancelTariff = async () => {
  return axios
    .get(`${baseUrl}/web/pay/cancelTariff`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token, //the token is a variable which holds the token
      },
      validateStatus: function (status: number) {
        return status > 199 || status < 300; // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      return res.data.response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const getBindCardUrl = async () => {
  return axios
    .get(`${baseUrl}/web/pay/bindCard`, {
      headers: {
        Authorization: "Bearer " + cookie.parse(document.cookie).access_token, //the token is a variable which holds the token
      },
      validateStatus: function (status: number) {
        return status > 199 || status < 300; // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data.response;
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
