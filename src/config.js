/**
 * This file is part of gulp-flow.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code
 * or visit https://github.com/gulp-flow/gulp-flow.
 */

'use strict';

let filesSrc;
let path = require('path');
let EnvList = require('envlist');

let cfg = {
  pkg            : require(path.join(path.resolve(), 'package.json')),
  srcDir         : 'src',
  publicDir      : 'public',
  publicAssetsDir: 'public/assets',
  publicCSSDir   : 'public/assets/css',
  publicImgDir   : 'public/assets/img',
  publicJsDir    : 'public/assets/js',
  distDir        : 'dist',
  patterns: {
    ignore: [
      '!src/**/_*',
      '!src/**/_*/*',
      '!src/_*/',
      '!src/_*/**',
      '!src/_*/**/*'
    ]
  },
  localPort : process.env.SERVE_PORT || 8080,
  envList: new EnvList(),
  get env() {
    return this.envList.env;
  },
  set env(value) {
    throw new Error(
      'Cannot replace the "env" value (it\'s read-only). ' +
      'Use flow.ensureEnv() or flow.cfg.envList.'
    );
  },
  get banner() {
    let pkg = this.pkg;
    let banner = '/*! '+ pkg.name + ' v'+ pkg.version + ' | ';

    if(typeof pkg.license === 'string') {
      banner += pkg.license;
    }
    // old package.json
    else if(typeof pkg.license === 'object') {
      banner += pkg.license.type;
    }
    // old package.json
    else if(pkg.licenses && pkg.licenses[0]) {
      banner += pkg.licenses[0].type;
    }

    banner += ' (c) '+ (new Date().getFullYear());

    if(pkg.author && pkg.author.name) {
      banner += ' ' + pkg.author.name;
    }

    if(pkg.homepage) {
      banner += ' - ' + pkg.homepage;
    }

    banner += ' */';

    return banner;
  }
};


/*----------------------------------------------------------------------------*\
  Env
\*----------------------------------------------------------------------------*/

cfg.envList.resolveAppEnv = function resolveAppEnv() {
  cfg.envList.env = process.env.APP_ENV
    || process.env.NODE_ENV
    || require('./').gp.util.env.type
  ;

  if(cfg.envList.env && cfg.envList.has(cfg.envList.env)) {
    return cfg.envList;
  }

  throw new ReferenceError('Environment not found.');
};

cfg.envList.consolidate = function consolidate() {
  let current;
  if(!cfg.envList.env) {
    cfg.envList.resolveAppEnv();
  }

  if(process && process.env) {
    current = cfg.envList.envs[cfg.envList.env];
    process.env.APP_ENV = current.APP_ENV;
    process.env.NODE_ENV = current.NODE_ENV;
    require('./').gp.util.env.type = current.NODE_ENV;
  }

  return cfg.envList;
};


/*----------------------------------------------------------------------------*\
  Files
\*----------------------------------------------------------------------------*/

filesSrc = [cfg.srcDir + '/**/*'].concat(cfg.patterns.ignore);

cfg.files = {
  src : filesSrc,
  srcWatch: filesSrc
};

module.exports = cfg;
