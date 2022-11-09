# NestJS Serverless Boilerplate

## Stack

nestjs.com
serverless.com
webpack.js.org
typescriptlang.org
prettier.io
github.com/okonet/lint-staged

## Concepts

### Lazy Module

**Modules**

| modules          | type          |
| ---------------- | ------------- |
| src/domains/api  | loaded module |
| src/domains/zoo  | loaded module |
| src/domains/cats | lazy module   |
| src/domains/dogs | lazy module   |

**Paths**

| Path         |
| ------------ |
| `/zoo/lazy`  |
| `/dogs/lazy` |
| `/cats/lazy` |
| `/docs`      |

## Deployment

### Prerequisites

```sh
# install dependencies
npm install

# run locally offline
npx sls offline start

# setup aws
aws configure

# deploy remotely
npx sls deploy --stage dev
```

---

Dev reminders:

- Beware: GraphQL is not compatible with LazyModule - [note here](https://docs.nestjs.com/fundamentals/lazy-loading-modules#lazy-loading-controllers-gateways-and-resolvers)

BUGS:

- https://docs.nestjs.com/fundamentals/lazy-loading-modules

`If you use Webpack, make sure to update your tsconfig.json file - setting compilerOptions.module to "esnext" and adding compilerOptions.moduleResolution property with "node"`

- Swagger requests does not include lambda stage prefix for requests
