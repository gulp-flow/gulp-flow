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

let path = require('path');

let cfg = {
  freezeEnv : false,
  pkg       : require(path.join(path.resolve(), 'package.json')),
  srcDir    : 'src',
  publicDir : 'public',
  distDir   : 'dist',
  patterns: {
    ignore: [
      '!src/**/_*/*',
      '!src/_*/**/*'
    ]
  },
  localPort : process.env.SERVE_PORT || 8080,
  get env() {
    return process.env.NODE_ENV || require('./').gp.util.env.type;
  },
  set env(value) {
    if(this.freezeEnv) {
      throw new Error(
        'Cannot replace the "env" value. ' +
        'Because the "env" property is configured in read only. ' +
        '(see flow.cfg.freezeEnv).'
      );
    }

    process.env.NODE_ENV = value;
    require('./').gp.util.env.type = value;
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

module.exports = cfg;
