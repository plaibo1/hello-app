interface AccessSchema {
  [key: string]: {
    [key: string]: string[] | string;
  };
  withPremium: {
    access: string[];
    redirect: string;
  };
  withoutPremium: {
    access: string[];
    redirect: string;
  };
  withoutLogin: {
    access: string[];
    redirect: string;
  };
}

export const accessLinks: AccessSchema = {
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
