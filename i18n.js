module.exports = {
  locales: ['default', 'en', 'ru'],
  defaultLocale: 'default',
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
