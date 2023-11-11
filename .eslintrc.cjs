const { configure, presets } = require("eslint-kit");

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== "production",
  extend: {
    rules: {
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "unicorn/no-abusive-eslint-disable": "off"
    },
  },
  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier({
        "semi": false
    }),
    presets.typescript(),
    presets.react(),
  ],
});
