export default () => ({
  nodeEnv: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT,
    name: process.env.APP_NAME,
  },
});
