import { LoginSchema } from "./user.d";
import * as cookie from "cookie";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

export const signIn = async ({ password, phone }: LoginSchema) => {
  return axios
    .post(`${baseUrl}/auth/signIn`, {
      phone,
      password,
      validateStatus: function (status: any) {
        return status > 199 || status < 300; // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      console.log(res);
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
      validateStatus: function (status: any) {
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

export const getSelfInfo = async (token?: string) => {
  console.log(
    "Bearer " + (token || cookie.parse(document.cookie).access_token)
  );
  return axios
    .get(`${baseUrl}/user/self`, {
      headers: {
        Authorization:
          "Bearer " + (token || cookie.parse(document.cookie).access_token), //the token is a variable which holds the token
      },
      validateStatus: function (status: any) {
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
