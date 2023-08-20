export default () => ({
  nodeEnv: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT,
    name: process.env.APP_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.EXPIRE,
    refreshExpire: process.env.REFRESH_EXPIRE,
  },
});
