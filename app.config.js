export default ({ config }) => ({
  ...config,
  name: "Sign-Speak-React-Native-SDK",
  slug: "Sign-Speak-React-Native-SDK",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
