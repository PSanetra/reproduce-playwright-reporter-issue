import { test } from '@playwright/test';
import { DataTypes, Model, Sequelize } from "sequelize";

class SomeEntity extends Model {
  name: string;
}

test.describe('App', () => {
  test('will fail with useless sequelize error', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    const sequelize = new Sequelize('sqlite::memory:./testdb.sqlite')

    await sequelize.authenticate()

    SomeEntity.init({
      name: {
        type: DataTypes.TEXT,
        primaryKey: true
      }
    }, { sequelize });

    await SomeEntity.create({
      name: 'entity_name'
    })

  });

  test('just print error object', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    const sequelize = new Sequelize('sqlite::memory:./testdb.sqlite')

    await sequelize.authenticate()

    SomeEntity.init({
      name: {
        type: DataTypes.TEXT,
        primaryKey: true
      }
    }, { sequelize });

    try {
      await SomeEntity.create({
        name: 'entity_name'
      })
    }
    catch (e) {
      console.log('Actual error has quite useful properties: ', e)
    }

  });

});
