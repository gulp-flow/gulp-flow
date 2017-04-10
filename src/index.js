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

let filesSrc, customBanner;
let _ = require('lodash');
let path = require('path');
let EnvList = require('envlist');
let rootPath = path.resolve();

let ignorePatterns;

let flow = {
  envList: new EnvList(),

  cfg : {
    rootPath       : rootPath,
    pkg            : require(path.join(rootPath, 'package.json')),
    srcDir         : 'src',
    publicDir      : 'public',
    publicAssetsDir: 'public/assets',
    publicCssDir   : 'public/assets/css',
    publicImgDir   : 'public/assets/img',
    publicJsDir    : 'public/assets/js',
    distDir        : 'dist',
    patterns: {
      get ignore() {
        let srcDir;

        if (ignorePatterns) {
          return ignorePatterns;
        }

        // init
        srcDir = flow.cfg.srcDir;

        ignorePatterns = [
          '!' + srcDir + '/**/_*',
          '!' + srcDir + '/**/_*/*',
          '!' + srcDir + '/_*/',
          '!' + srcDir + '/_*/**',
          '!' + srcDir + '/_*/**/*'
        ];

        return ignorePatterns;
      },
      set ignore(value) {
        throw new Error(
          'Cannot replace the "ignore" value (use the Array methods instead).'
        );
      }
    },
    localPort : process.env.SERVE_PORT || 8080,
    get env() {
      return flow.envList.env;
    },
    set env(value) {
      throw new Error(
        'Cannot replace the "env" value (it\'s read-only). ' +
        'Use flow.ensureEnv() or flow.envList.'
      );
    },
    get banner() {
      let pkg, banner;

      if (customBanner) {
        if (typeof customBanner === 'string') {
          return customBanner;
        }

        return customBanner();
      }

      pkg = this.pkg;
      banner = '/*! '+ pkg.name + ' v'+ pkg.version + ' | ';

      if (typeof pkg.license === 'string') {
        banner += pkg.license;
      }
      // old package.json
      else if (typeof pkg.license === 'object') {
        banner += pkg.license.type;
      }
      // old package.json
      else if (pkg.licenses && pkg.licenses[0]) {
        banner += pkg.licenses[0].type;
      }

      banner += ' (c) '+ (new Date().getFullYear());

      if (pkg.author && pkg.author.name) {
        banner += ' ' + pkg.author.name;
      }

      if (pkg.homepage) {
        banner += ' - ' + pkg.homepage;
      }

      banner += ' */';

      return banner;
    },
    set banner(banner) {
      customBanner = banner;
    }
  },

  // Gulp plugins
  gp: {
    concat  : require('gulp-concat'),
    hash    : require('gulp-hash-filename'),
    header  : require('gulp-header'),
    ifElse  : require('gulp-if-else'),
    tap     : require('gulp-tap'),
    rename  : require('gulp-rename'),
    replace : require('gulp-replace'),
    newer   : require('gulp-newer'),
    using   : require('gulp-using'),
    util    : require('gulp-util')
  },

  // pipelines (lazypipe)
  pipes: {},

  // utilities
  utils: {
    _,
    // stream handlers
    lazypipe : require('lazypipe'),
    del      : require('del'),
    es       : require('event-stream'),
    through  : require('through2')
  }
};


/*----------------------------------------------------------------------------*\
  Mixins
\*----------------------------------------------------------------------------*/

 /**
  * Merge recursive.
  *
  * @param {object|array} obj       Object that receives the value from `other`
  * @param {...object|array} other   One or more objects to merge in `obj`.
  * @return {object} `obj` merged
  */
_.mixin({
  mergeRecursive: function mergeRecursive(obj/*, other*/) {
    let ln = arguments.length;

    if (ln < 2) {
      throw new Error('There should be at least 2 arguments passed to _.mergeRecursive()');
    }

    for (let i = 1; i < ln; i++) {
      for (let p in arguments[i]) {
        if (obj[p] && typeof obj[p] === 'object') {
          obj[p] = _.mergeRecursive(obj[p], arguments[i][p]);
        } else {
          obj[p] = arguments[i][p];
        }
      }
    }

    return obj;
  }
}, { chain: false });

 /**
  * Require module from string
  *
  *
  */
_.mixin(
  {
    requireFromString: function requireFromString(src, filename) {
      var m = new module.constructor();
      m.paths = module.paths;
      m._compile(src, filename);
      return m.exports;
    }
  },
  { chain: false }
);

/*----------------------------------------------------------------------------*\
  Env
\*----------------------------------------------------------------------------*/

flow.envList.resolveAppEnv = function resolveAppEnv() {
  flow.envList.env = process.env.APP_ENV
    || process.env.NODE_ENV
    || flow.gp.util.env.type
  ;

  if (flow.envList.env && flow.envList.has(flow.envList.env)) {
    return flow.envList;
  }

  throw new ReferenceError('Environment not found.');
};

flow.envList.consolidate = function consolidate() {
  let current;

  if (!flow.envList.env) {
    flow.envList.resolveAppEnv();
  }

  if (process && process.env) {
    current = flow.envList.envs[flow.envList.env];
    process.env.APP_ENV = current.APP_ENV;
    process.env.NODE_ENV = current.NODE_ENV;
    flow.gp.util.env.type = current.NODE_ENV;
  }

  return flow.envList;
};


/*----------------------------------------------------------------------------*\
  Files
\*----------------------------------------------------------------------------*/

filesSrc = [flow.cfg.srcDir + '/**/*'].concat(flow.cfg.patterns.ignore);

flow.cfg.files = {
  src : filesSrc.slice(0),
  srcWatch: filesSrc.slice(0)
};

// shortcut of `flow.cfg.envList.ensure`
flow.ensureEnv = function ensureEnv(appEnvName) {
  flow.envList.ensure(appEnvName);
  return flow;
};


module.exports = flow;
