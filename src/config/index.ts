const getEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

const env = process.env.NODE_ENV;

const config = {
  rapidApi: {
    key: getEnv('REACT_APP_RAPIDAPI_KEY'),
    host: getEnv('REACT_APP_RAPIDAPI_HOST'),
  },
  isProd: env === 'production',
  isDev: env === 'development',
  isTest: env === 'test',
};

export default config;
