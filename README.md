# my_midway_project

基于 Nodejs+express+Midway+Typescript 框架的生猪养殖管理系统

- 在 src/entity 文件夹下添加 ormconfig.json 文件

```json
[
  {
    "name": "default",
    "type": "mysql",
    "host": "",
    "port": ,
    "username": "",
    "password": "",
    "database": "",
    "synchronize": false,
    "entities": ["entities/*.ts"]
  }
]

```

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[midway]: https://midwayjs.org
