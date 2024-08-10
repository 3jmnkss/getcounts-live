// roots.config.js
const path = require('path')
const i18nConfig = require('./i18nConfig');

console.log(i18nConfig)

module.exports = {
  // where original routes are placed
  originDir: path.resolve(__dirname, 'roots'),
  // where translated routes will be saved
  localizedDir: path.resolve(__dirname, 'app'),
  // which locales are we going to use (URL prefixes)
  locales: i18nConfig.locales,
  // which locale is considered as default when no other match
  defaultLocale: i18nConfig.defaultLocale,
  // serves default locale on "/en" instead of "/"
  prefixDefaultLocale: i18nConfig.prefixDefaultLocale, 
}