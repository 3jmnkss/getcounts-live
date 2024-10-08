// const isProd = process.env.NODE_ENV === 'production'
// console.log("É PRODUÇÃO?", isProd)

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  //TODO Avliar uso de image loader pronto para export
  // images: {
  //   loader: 'custom',
  //   loaderFile: './img-loader.js',
  // },
}

// console.log(nextConfig)

module.exports = nextConfig;