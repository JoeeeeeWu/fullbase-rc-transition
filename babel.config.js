const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (api) => {
  api.cache(true);

  const presets = [
    "@babel/react",
    "@babel/env",
    "@babel/typescript",
  ];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "useEsModules": true
      }
    ],
    [
      "@babel/proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/proposal-class-properties"
    ],
    // [
    //   "import",
    //   {
    //     "libraryName": "antd",
    //     "libraryDirectory": "es",
    //     "style": true
    //   }
    // ],
    // [
    //   "lodash"
    // ],
    // isDevelopment && [
    //   "react-refresh/babel"
    // ],
  ].filter(Boolean);

  return {
    presets,
    plugins,
    // sourceType: "unambiguous",
  };
};
