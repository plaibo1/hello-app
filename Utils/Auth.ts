import { NationalNumber } from "libphonenumber-js/types";
import { useContext } from "react";
import { Context } from "../context";

const server = process.env.NEXT_PUBLIC_API_HOST;

export interface PhoneSchema {
  phone: {
    country: string;
    number: NationalNumber | undefined;
  };
}

export interface CodeConfirmSchema extends PhoneSchema {
  code: string;
  confirmType: string;
}

export interface NewPasswordScheme {
  newPassword: string;
}

export interface LoginSchema extends PhoneSchema {
  password: string;
}

export const logout = () => {
  return fetch(`${server}/api/signOut`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((response) => {
        console.log(response.error);
        throw new Error(response.error.message);
      });
    })
    .then((data) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return data;
    });
};

export const login = (body: LoginSchema) => {
  return fetch(`${server}/auth/signIn`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((response) => {
        console.log(response.error);
        throw new Error(response.error.message);
      });
    })
    .then((data) => {
      localStorage.setItem(
        "access_token",
        data.response.credentials.access_token
      );
      localStorage.setItem(
        "refresh_token",
        data.response.credentials.refresh_token
      );
      return data;
    });
};

export const Self = () => {
  return fetch(`${server}/user/self`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((response) => {
      throw new Error(response.error.message);
    });
  });
};

export const PremiumStatus = () => {
  return fetch(`${server}/user/pay/selfStatus`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((response) => {
      throw new Error(response.error.message);
    });
  });
};

export const restore = (body: PhoneSchema) => {
  return fetch(`${server}/auth/restore`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((response) => {
      console.log(response.error);
      throw new Error(response.error.message);
    });
  });
};

export const codeConfirm = (body: CodeConfirmSchema) => {
  return fetch(`${server}/auth/codeConfirm`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
      return response.json().then((response) => {
        console.log(response.error);
        throw new Error(response.error.message);
      });
    })
    .then((data) => {
      localStorage.setItem(
        "access_token",
        data.response.credentials.access_token
      );
      localStorage.setItem(
        "refresh_token",
        data.response.credentials.refresh_token
      );
      return data;
    });
};

export const newPassword = (body: NewPasswordScheme) => {
  return fetch(`${server}/api/newPassword`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
      return response.json().then((response) => {
        console.log(response.error);
        throw new Error(response.error.message);
      });
    })
    .catch((error) => console.log(error));
};

export const CheckAuth = () => {
  const { dispatch } = useContext<any>(Context);
  Self()
    .then((userData) => {
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { auth: true, data: userData.response },
      });
      if (userData.repsonse.premium) {
        PremiumStatus()
          .then((status) => {
            dispatch({
              type: "PREMIUM_STATUS",
              payload: status.response,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        dispatch({ type: "WITHOUT_PREMIUM" });
      }
    })
    .catch(() => {
      dispatch({ type: "LOGGED_OUT_USER" });
    });
};
