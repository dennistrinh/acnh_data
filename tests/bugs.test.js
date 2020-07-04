require('chromedriver')
const {Builder, By, Key, util} = require('selenium-webdriver');
const url = 'https://dennistrinh.net/bugs';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;
let browser;

// Initialize Builder and check title
it('Title is correct', async () => {
  browser = await new Builder()
    .forBrowser('chrome')
    .build();
  await browser.get(url);
  const title = await browser.findElement(By.tagName('h1')).getText();
  expect(title).toContain('All Bugs');
});

// Check if table headers are correct
describe('Table sorts are correct', () => {
  describe('Sort by name is correct', () => {
    it('Sort by name ascending is correct', async () => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[1]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[1]')).getText();
      expect(first).toBe('Agrias Butterfly');
    });
    it('Sort by name descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[1]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[1]')).getText();
      expect(first).toBe('Yellow Butterfly');
    });
  });
  describe('Sort by location is correct', () => {
    it('Sort by location ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[3]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[3]')).getText();
      expect(first).toContain('Disguised');
    });
    it('Sort by location descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[3]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[3]')).getText();
      expect(first).toBe('Underground');
    });
  });
  describe('Sort by month is correct', () => {
    it('Sort by month ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[4]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[4]')).getText();
      expect(first).toBe('All Year');
    });
    it('Sort by month descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[4]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[4]')).getText();
      expect(first).toContain('December');
    });
  });
  describe('Sort by time is correct', () => {
    it('Sort by time ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[5]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[5]')).getText();
      expect(first).toBe('All Day');
    });
    it('Sort by time descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[5]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[5]')).getText();
      expect(first).toContain('11 PM');
    });
  });
  describe('Sort by price is correct', () => {
    it('Sort by price ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[6]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[6]')).getText();
      expect(first).toBe('10');
    });
    it('Sort by price descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[6]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[6]')).getText();
      expect(first).toBe('12000');
    });
  });
});

