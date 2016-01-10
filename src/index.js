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

let _ = require('lodash');

let flow = {
  cfg      : require('./config'),

  // stream handlers
  lazypipe : require('lazypipe'),
  del      : require('del'),
  es       : require('event-stream'),

  // Gulp plugins
  gp: {
    concat  : require('gulp-concat'),
    header  : require('gulp-header'),
    ifElse  : require('gulp-if-else'),
    rename  : require('gulp-rename'),
    replace : require('gulp-replace'),
    util    : require('gulp-util')
  },

  // lazypipe
  pipes: {}
};


/*----------------------------------------------------------------------------*\
  Mixins
\*----------------------------------------------------------------------------*/

 /**
  * Merge recursive.
  *
  * @param {object|array} obj       Object that receives the value from `from`
  * @param {...object|array} from   One or more objects to merge in `obj`.
  * @return {object} `obj` merged
  */
_.mixin({
  mergeRecursive: function mergeRecursive(obj, from) {
    var ln = arguments.length;

    if (ln < 2) {
      throw new Error('There should be at least 2 arguments passed to _.mergeRecursive()');
    }

    for (var i = 1; i < ln; i++) {
      for (var p in arguments[i]) {
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

flow._ = _;


module.exports = flow;