require('chromedriver');
const {Builder, By, Key, util} = require('selenium-webdriver');
const url = 'https://dennistrinh.net/bugs';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 1;
let browser;

// Initialize Builder and check title
it('Title is correct', async () => {
  browser = await new Builder()
    .forBrowser('chrome')
    .build();
  await browser.get(url);
  const title = await browser.findElement(By.css('h1')).getText();
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
  describe('Sort by image is correct', () => {
    it('Sort by image ascending is correct', async () => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[2]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
      expect(first).toContain('agrias_butterfly.png');
    });
    it('Sort by name descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[1]/th[2]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="bugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
      expect(first).toContain('yellow_butterfly.png');
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

describe('Check if month data is correct', () => {
  it('January bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('January');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Bugs in January')
    const description = await browser.findElement(By.css('h2')).getText();
    expect(description).toContain('Nothing new');
  });
  it('February bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('February');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Bugs in February');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Tiger Beetle');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('tiger_beetle.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('On the Ground');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('February - October');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('1500');
  });
  it('March bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('March');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Bugs in March');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Yellow Butterfly');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('yellow_butterfly.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('March - June\nSeptember - October');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('4 AM - 7 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('160');
  });
  it('April bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('April');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Bugs in April');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Common Bluebottle');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('common_bluebottle.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('April - August');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('4 AM - 7 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('300');
  });
  it('May bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('May');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in May');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Great Purple Emperor');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('great_purple_emperor.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('May - August');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('4 AM - 7 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('3000');
  });
  it('June bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('June');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in June');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Emperor Butterfly');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('emperor_butterfly.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('June - September\nDecember - March');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('5 PM - 8 AM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('4000');
  });
  it('July bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('July');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in July');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Grasshopper');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('grasshopper.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('On the Ground');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('July - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('8 AM - 5 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('160');
  });
  it('August bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('August');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in August');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Migratory Locust');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('migratory_locust.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('On the Ground');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('August - November');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('8 AM - 7 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('600');
  });
  it('September bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('September');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in September');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Common Butterfly');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('common_butterfly.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('September - June');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('4 AM - 7 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('160');
  });
  it('October bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('October');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in October');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Ladybug');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('ladybug.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('On Flowers');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('March - June\nOctober - October');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('8 AM - 5 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('200');
  });
  it('November bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('November');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in November');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Damselfly');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('damselfly.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('November - February');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('500');
  });
  it('December bugs correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('December');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Bugs in December');
    const name = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Emperor Butterfly');
    const image = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('emperor_butterfly.png');
    const location = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Flying');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('June - September\nDecember - March');
    const time_found = await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('5 PM - 8 AM');
    const price = await await browser.findElement(By.xpath('//*[@id="newBugs"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('4000');
  });
});


