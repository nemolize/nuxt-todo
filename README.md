[![CircleCI](https://circleci.com/gh/nemolize/nuxt-todo/tree/master.svg?style=svg)](https://circleci.com/gh/nemolize/nuxt-todo/tree/master)

# nuxt-todo

A todo list manager example made with Nuxt.js

Demo:
https://nuxt-todo.now.sh/

##### Features
* Add/Delete including confirm modal on delete
  
##### Others
* While this application is intended as an example of Nuxt.js, [TypeScript](https://www.typescriptlang.org/) is not used.
* [Bulma](http://bulma.io) for styling
  * `TodoList` component uses variable of `bulma` with `@import`
* [now](https://zeit.co/now) for demo site deploy
* [CircleCI](https://circleci.com) for CI/CD
  
## Clone

```bash
git clone git@github.com:nemolize/nuxt-todo.git && cd nuxt-todo
```

## Build

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# generate static project
$ yarn run generate
```

## Deploy
```bash
npx now dist
```
