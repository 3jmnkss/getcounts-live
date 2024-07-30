const isProd = process.env.NODE_ENV === 'production'
console.log("É PRODUÇÃO?", isProd)

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
   
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    trailingSlash: false,
   
    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    skipTrailingSlashRedirect: true,
   
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',

    images: {
        loader: 'custom',
        loaderFile: './img-loader.js',
      },
  }

module.exports = nextConfig;
