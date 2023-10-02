const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({
  experimental: {
    appDir:true,
  esmExternals: false, // THIS IS THE FLAG THAT MATTERS
}})

/** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       esmExternals: false, // THIS IS THE FLAG THAT MATTERS
//     },
//   };
   
//   module.exports = nextConfig;