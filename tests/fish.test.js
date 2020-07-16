require('chromedriver');
const {Builder, By, Key, util} = require('selenium-webdriver');
const url = 'https://dennistrinh.net/fish';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 1;
let browser;

// Initialize Builder and check title
it('Title is correct', async () => {
  browser = await new Builder()
    .forBrowser('chrome')
    .build();
  await browser.get(url);
  const title = await browser.findElement(By.css('h1')).getText();
  expect(title).toContain('All Fish');
});

// Check if table headers are correct
describe('Table sorts are correct', () => {
  describe('Sort by name is correct', () => {
    it('Sort by name ascending is correct', async () => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[1]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[1]')).getText();
      expect(first).toBe('Anchovy');
    });
    it('Sort by name descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[1]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[1]')).getText();
      expect(first).toBe('Zebra Turkeyfish');
    });
  });
  describe('Sort by image is correct', () => {
    it('Sort by image ascending is correct', async () => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[2]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
      expect(first).toContain('anchovy.png');
    });
    it('Sort by name descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[2]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
      expect(first).toContain('zebra_turkeyfish.png');
    });
  });
  describe('Sort by location is correct', () => {
    it('Sort by location ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[3]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[3]')).getText();
      expect(first).toBe('Clifftop River & Pond [3]');
    });
    it('Sort by location descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[3]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[3]')).getText();
      expect(first).toBe('Sea During Rain [6]');
    });
  });
  describe('Sort by month is correct', () => {
    it('Sort by month ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[4]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[4]')).getText();
      expect(first).toBe('All Year');
    });
    it('Sort by month descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[4]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[4]')).getText();
      expect(first).toContain('December');
    });
  });
  describe('Sort by time is correct', () => {
    it('Sort by time ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[5]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[5]')).getText();
      expect(first).toBe('All Day');
    });
    it('Sort by time descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[5]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[5]')).getText();
      expect(first).toContain('9 PM');
    });
  });
  describe('Sort by price is correct', () => {
    it('Sort by price ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[6]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[6]')).getText();
      expect(first).toBe('100');
    });
    it('Sort by price descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[1]/th[6]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="fish"]/tbody/tr[2]/td[6]')).getText();
      expect(first).toBe('15000');
    });
  });
});

describe('Check if month data is correct', () => {
  it('January fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('January');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Fish in January')
    const description = await browser.findElement(By.css('h2')).getText();
    expect(description).toContain('Nothing new');
  });
  it('February fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('February');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Fish in February');
    const description = await browser.findElement(By.css('h2')).getText();
    expect(description).toContain('Nothing new');
  });
  it('March fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('March');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Fish in March');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Tadpole');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('tadpole.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Pond [1]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('March - July');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('100');
  });
  it('April fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('April');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Fish in April');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Killifish');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('killifish.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Pond [1]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('April - August');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('300');
  });
  it('May fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('May');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in May');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Frog');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('frog.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Pond [2]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('May - August');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('120');
  });
  it('June fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('June');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in June');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Giant Snakehead');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('giant_snakehead.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Pond [4]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('June - August');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('9 AM - 4 PM');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('5500');
  });
  it('July fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('July');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in July');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Sweetfish');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('sweetfish.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('River [3]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('July - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('900');
  });
  it('August fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('August');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in August');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Soft-shelled Turtle');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('softshelled_turtle.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('River [4]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('August - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('4 PM - 9 AM');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('3750');
  });
  it('September fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('September');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in September');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Pike');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('pike.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('River [5]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('September - December');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('1800');
  });
  it('October fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('October');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in October');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Dab');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('dab.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('Sea [3]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('October - April');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('300');
  });
  it('November fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('November');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in November');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Bitterling');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('bitterling.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('River [1]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('November - March');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('900');
  });
  it('December fish correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('December');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toContain('New Fish in December');
    const name = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Pond Smelt');
    const image = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('pond_smelt.png');
    const location = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[3]')).getText();
    expect(location).toBe('River [2]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('December - February');
    const time_found = await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newFish"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('500');
  });
});

