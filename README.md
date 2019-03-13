# gulp-flow

`gulp-flow` helps to organize and re-use a collection of tasks.
This is the base package to create a more sophisticated workflow.


## Requirements

 * __>=__ Node v6 (v6 or +)
 * __>=__ Gulp v4 (v4 or +)

## Install

`gulp-flow` requires _Gulp 4_.

* Install Gulp 4 CLI tools globally:

```sh
npm install gulpjs/gulp-cli -g
```

* Install Gulp 4 into your project:

```sh
npm install --save-dev gulp
```

* Install Gulp flow:

```sh
npm install --save-dev gulp-flow
```


## Usage

_gulpfile.js_

```js
let flow = require('gulp-flow');
let {cfg, gp, pipes, utils, envList} = flow;
```

### Config

_TODO:_ `cfg`

#### Environment

`gulp-flow` use the [envlist](https://github.com/Nicolab/envlist) module to finely manage and consolidate the environments.

See [envlist](https://github.com/Nicolab/envlist) module for more details.

Recommended way:

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
// See envlist module for more details
console.log(process.env.NODE_ENV);
console.log(flow.envList.NODE_ENV);
```

Also you can ensure the environment directly in your tasks with `flow.envList.ensure()`
or the shortcut `flow.ensureEnv()`.

### Gulp plugins

_TODO:_ `gp`

### Pipes

_TODO:_ `pipes`

### Bundles

_TODO:_ bundles

### Utils

_TODO:_ `utils`

## LICENSE

[MIT](https://github.com/gulp-flow/gulp-flow/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](https://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](https://nicolab.net) |
|---|
| [Nicolas Talle](https://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |