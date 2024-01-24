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

- 在 src/config 文件下添加 config.default.ts 文件

```ts
import { MidwayConfig } from '@midwayjs/core';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '',
  express: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '',
        port: ,
        username: '',
        password: '',
        database: '',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        // 或者扫描形式
        // 扫描好像会出问题，建议使用实体类引入的方式，entities: [Pig]
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;

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
