require('chromedriver')
const webdriver = require('selenium-webdriver');
const url = 'https://dennistrinh.net/bugs';

it('Title is correct', async () => {
  let browser = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  await browser.get(url);
  const title = await browser.findElement(by.tagName('h1')).getText();
  expect(title).toContain('All Bugs');
});
