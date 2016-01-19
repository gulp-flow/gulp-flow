# gulp-flow

`gulp-flow` helps to organize and re-use a collection of tasks. This is the basic package to create a more sophisticated workflow.


## Requirements

 * __>=__ Node v4 (v4 or +)
 * __>=__ Gulp v4 (v4 or +)

## Install

`gulp-flow` requires _Gulp 4_.

### Install Gulp 4 (if not already installed)

If _Gulp 4_ is already installed, you can skip this step (go to [install gulp-flow](#install-gulp-flow)) :+1:

#### Uninstall previous Gulp installation (if there is a Gulp installed less than v4)

```sh
npm uninstall gulp -g
cd [your_project_root]
npm uninstall gulp
```

#### Install Gulp 4 CLI tools globally from 4.0 GitHub branch

```sh
npm install gulpjs/gulp-cli#4.0 -g
```

#### Install Gulp 4 into your project

```sh
npm install --save-dev gulpjs/gulp.git#4.0
```


### Install Gulp flow

```sh
npm install --save-dev gulp-flow
```


## Usage

```js
let flow = require('gulp-flow');
```

### Command

If you are a _Unix_ user, to be able to support natively the modern JS features (ES6 / ES7) in your tasks scripts (without transpiler), you can add in your `.bashrc` (or `.bash_aliases`) file this alias:

```sh
# run Gulp with some features of ES6/ES7
alias gulp='node --es_staging --harmony_destructuring `which gulp`'
```

Now you can write the modern JS (supported by Node.js) in your _gulpfile.js_:
```js
let {cfg, gp, pipes} = require('gulp-flow');
```

### Config

_TODO:_ `cfg`

#### Environment

`gulp-flow` use the [envlist](https://github.com/Nicolab/envlist) module to finely manage and consolidate the environments.

See [envlist](https://github.com/Nicolab/envlist) for more details.

```sh
gulp --type=dev
```
or
```sh
APP_ENV=dev gulp
```
or
```sh
NODE_ENV=dev gulp
```

_gulpfile.js_
```js
// cfg.env output: dev
console.log(cfg.env);

// NODE_ENV output: development
// Why? Because it's a convention of the Node.js sphere ;)
// See envlist for more details
console.log(process.env.NODE_ENV);
console.log(cfg.envList.NODE_ENV);
```

Also you can ensure the environment directly in your tasks with `cfg.envList.ensure()`
or the shortcut `flow.ensureEnv()`.

### Gulp plugins

_TODO:_ `gp`

### Pipes

_TODO:_ `pipes`

### Bundles

_TODO:_ bundles

## LICENSE

[MIT](https://github.com/gulp-flow/gulp-flow/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |