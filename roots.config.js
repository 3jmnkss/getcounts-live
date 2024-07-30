// roots.config.js
const path = require('path')

module.exports = {
  // where original routes are placed
  originDir: path.resolve(__dirname, 'roots'),
  // where translated routes will be saved
  localizedDir: path.resolve(__dirname, 'app'),
  // which locales are we going to use (URL prefixes)
  locales: ["en", "pt", "hi"],
  // which locale is considered as default when no other match
  defaultLocale: 'en',
  // serves default locale on "/en" instead of "/"
  prefixDefaultLocale: false, 
}