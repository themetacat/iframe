// /** @type {import('next').NextConfig} */

// const nextConfig = {};

// module.exports = nextConfig;


module.exports = (phase, { defaultConfig }) => {
    return {
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
  }
  