// /** @type {import('next').NextConfig} */

// const nextConfig = {};

// module.exports = nextConfig;


// module.exports = (phase, { defaultConfig }) => {
//     return {
//       ...defaultConfig,
  
//       webpack: (config) => {
//         config.resolve = {
//           ...config.resolve,
//           fallback: {
//             "fs": false,
//             "path": false,
//             "os": false,
//           }
//         }
//         return config
//       },
//     }
    
//   }
  module.exports = {
    async headers() {
      return [
        {
          "source": "/api/(.*)",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        },
        {
          ...defaultConfig,
      
          webpack: (config) => {
            config.resolve = {
              ...config.resolve,
              fallback: {
                "fs": false,
                "path": false,
                "os": false,
              }
            }
            return config
          },
        }
      ]
    }
  };