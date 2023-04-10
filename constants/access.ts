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
    access: ["/account", "/tariff", "/recovery", "/privacy_policy", "/user_agreement"],
    redirect: "/account",
  },
  withoutPremium: {
    access: ["/premium", "/recovery", "/privacy_policy", "/user_agreement"],
    redirect: "/premium",
  },
  withoutLogin: {
    access: ["/", "/premium", "/login", "/recovery", "/privacy_policy", "/user_agreement"],
    redirect: "/premium",
  },
};
