const withTypeScript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');

const postcssPresetEnvOptions = {
  features: {
    'custom-media-queries': true,
    'custom-selectors': true,
  }
};

module.exports = withTypeScript(
  withCSS({
    cssLoaderOptions: {
      camelCase: true,
      namedExport: true,
      modules: true
    },
    postcssLoaderOptions: {
      plugins: [
        postcssPresetEnv(postcssPresetEnvOptions),
        postcssNested()
      ]
    },
    webpack(config, options) {
      if (!options.isServer) {
        for (let entry of options.defaultLoaders.css) {
          if (entry.loader === 'css-loader') {
            entry.loader = 'typings-for-css-modules-loader';
            break;
          }
        }
      }
      return config;
    }
  })
);