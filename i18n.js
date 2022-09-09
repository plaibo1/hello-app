module.exports = {
  locales: ["en", "ru"],
  defaultLocale: "ru",
  pages: {
    "*": ["layout"],
    "/": ["home"],
    "/login": ["login", "inputs"],
    "/recovery": ["recovery", "inputs"],
    "/premium": ["premium"],
    "/account": ["account"],
    "/tariff": ["tariff"],
  },
};
