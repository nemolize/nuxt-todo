[![CircleCI](https://circleci.com/gh/nemolize/nuxt-todo/tree/master.svg?style=svg)](https://circleci.com/gh/nemolize/nuxt-todo/tree/master)
[![codecov](https://codecov.io/gh/nemolize/nuxt-todo/branch/master/graph/badge.svg)](https://codecov.io/gh/nemolize/nuxt-todo)

# nuxt-todo

[Nuxt.js](https://nuxtjs.org)を用いたTodoリスト管理のサンプルアプリケーション

デモ: https://nuxt-todo-demo.netlify.app/

##### 特徴
* Todoエントリの追加と削除、完了フラグの制御
  * 削除時の確認モーダルの実装を含む
* `Vuex`を用いたステート管理
* `LocalStorage`への値の永続化

#### その他
* `Nuxt.js`のサンプルとしての立ち位置を重視し[TypeScript](https://www.typescriptlang.org/)は導入せず、Vanilla Next.jsでの実装とした。
* スタイル定義に[Bulma](http://bulma.io)を利用している
  * `TodoList`コンポーネントでは `bulma`の定義を`@import`して`bulma`の変数を利用している
* デモサイトのデプロイに[now](https://zeit.co/now)を利用している
* CI/CDに[CircleCI](https://circleci.com)を利用している

## クローン

```bash
git clone git@github.com:nemolize/nuxt-todo.git && cd nuxt-todo
```

## ビルド

```bash
# 依存関係のインストール
$ yarn install

# localhost:3000でのサーバー起動
$ yarn run dev

# staticファイルとしてビルド
$ yarn run generate
```

## デプロイ
```bash
npx now dist
```
