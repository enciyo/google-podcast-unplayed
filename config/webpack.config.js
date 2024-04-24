'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    insert_show: PATHS.src + '/insert_show.js',
    insert_hide: PATHS.src + '/insert_hide.js',
    background: PATHS.src + '/background.js',
  },
});

module.exports = config;
