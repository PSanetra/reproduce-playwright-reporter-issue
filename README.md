# Reproduce https://github.com/microsoft/playwright/issues/18292 with sequelize error

1. Test code is located in `apps/playwright-tests/src/app.spec.ts`
2. Install dependencies: `yarn`
3. Execute playwright tests: `test:playwright`
4. Two tests are executed.

Failing test prints just something like the following:
```
1) src/app.spec.ts:9:3 › App › will fail with useless sequelize error ============================

    Error: 

        at Database.<anonymous> (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/sqlite/query.js:227:27)
        at ./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/sqlite/query.js:225:50
        at new Promise (<anonymous>)
        at Query.run (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/sqlite/query.js:225:12)
        at ./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/sequelize.js:649:28
        at SQLiteQueryInterface.insert (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/abstract/query-interface.js:795:21)
        at SomeEntity.save (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/model.js:4073:35)
        at Function.create (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/model.js:2280:12)
        at ./reproduce-bad-playwright-error-reporting-experience/apps/playwright-tests/src/app.spec.ts:23:5
        at ./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/workerRunner.js:426:9
        at TestInfoImpl._runFn (./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/testInfo.js:166:7)
        at ./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/workerRunner.js:376:26
        at TimeoutRunner.run (./reproduce-bad-playwright-error-reporting-experience/node_modules/playwright-core/lib/utils/timeoutRunner.js:53:14)
        at TimeoutManager.runWithTimeout (./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/timeoutManager.js:73:7)
        at TestInfoImpl._runWithTimeout (./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/testInfo.js:154:26)

```

The successful test prints something useful like the following directly to the console. _Something similar should be printed by playwright natively_:

```
Actual error has quite useful properties:  Error: 
    at Database.<anonymous> (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/sqlite/query.js:227:27)
    at ./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/sqlite/query.js:225:50
    at new Promise (<anonymous>)
    at Query.run (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/sqlite/query.js:225:12)
    at ./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/sequelize.js:649:28
    at SQLiteQueryInterface.insert (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/dialects/abstract/query-interface.js:795:21)
    at SomeEntity.save (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/model.js:4073:35)
    at Function.create (./reproduce-bad-playwright-error-reporting-experience/node_modules/sequelize/src/model.js:2280:12)
    at ./reproduce-bad-playwright-error-reporting-experience/apps/playwright-tests/src/app.spec.ts:44:7
    at ./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/workerRunner.js:426:9
    at TestInfoImpl._runFn (./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/testInfo.js:166:7)
    at ./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/workerRunner.js:376:26
    at TimeoutRunner.run (./reproduce-bad-playwright-error-reporting-experience/node_modules/playwright-core/lib/utils/timeoutRunner.js:53:14)
    at TimeoutManager.runWithTimeout (./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/timeoutManager.js:73:7)
    at TestInfoImpl._runWithTimeout (./reproduce-bad-playwright-error-reporting-experience/node_modules/@playwright/test/lib/testInfo.js:154:26) {
  name: 'SequelizeDatabaseError',
  parent: [Error: SQLITE_ERROR: no such table: SomeEntities] {
    errno: 1,
    code: 'SQLITE_ERROR',
    sql: 'INSERT INTO `SomeEntities` (`name`,`createdAt`,`updatedAt`) VALUES ($1,$2,$3);'
  },
  original: [Error: SQLITE_ERROR: no such table: SomeEntities] {
    errno: 1,
    code: 'SQLITE_ERROR',
    sql: 'INSERT INTO `SomeEntities` (`name`,`createdAt`,`updatedAt`) VALUES ($1,$2,$3);'
  },
  sql: 'INSERT INTO `SomeEntities` (`name`,`createdAt`,`updatedAt`) VALUES ($1,$2,$3);',
  parameters: {}
}

```
