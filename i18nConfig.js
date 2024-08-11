require('dotenv').config()

const i18nConfig = {
    defaultLocale: "en",
    ownLocales: ["en","pt"],
    locales: process.env.NEXT_PUBLIC_LOCALES.split(','),
    prefixDefaultLocale: false
  };
  
module.exports = i18nConfig;