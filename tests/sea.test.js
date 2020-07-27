require('chromedriver');
const {Builder, By, Key, util} = require('selenium-webdriver');
const url = 'https://dennistrinh.net/sea';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 1;
let browser;

// Initialize Builder and check title
it('Title is correct', async () => {
  browser = await new Builder()
    .forBrowser('chrome')
    .build();
  await browser.get(url);
  const title = await browser.findElement(By.css('h1')).getText();
  expect(title).toContain('All Sea');
});

// Check if table headers are correct
describe('Table sorts are correct', () => {
  describe('Sort by name is correct', () => {
    it('Sort by name ascending is correct', async () => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[1]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[1]')).getText();
      expect(first).toBe('Abalone');
    });
    it('Sort by name descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[1]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[1]')).getText();
      expect(first).toBe('Whelk');
    });
  });
  describe('Sort by image is correct', () => {
    it('Sort by image ascending is correct', async () => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[2]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
      expect(first).toContain('abalone.png');
    });
    it('Sort by name descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[2]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
      expect(first).toContain('whelk.png');
    });
  });
  describe('Sort by shadow size is correct', () => {
    it('Sort by shadow ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[3]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[3]')).getText();
      expect(first).toContain('Huge');
    });
    it('Sort by shadow size  descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[3]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[3]')).getText();
      expect(first).toContain('Tiny');
    });
  });
  describe('Sort by month is correct', () => {
    it('Sort by month ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[4]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[4]')).getText();
      expect(first).toBe('All Year');
    });
    it('Sort by month descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[4]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[4]')).getText();
      expect(first).toContain('November');
    });
  });
  describe('Sort by time is correct', () => {
    it('Sort by time ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[5]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[5]')).getText();
      expect(first).toBe('All Day');
    });
    it('Sort by time descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[5]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[5]')).getText();
      expect(first).toContain('9 PM');
    });
  });
  describe('Sort by price is correct', () => {
    it('Sort by price ascending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[6]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[6]')).getText();
      expect(first).toBe('500');
    });
    it('Sort by price descending is correct', async() => {
      const header = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[1]/th[6]'));
      await browser.wait(header.click());
      const first = await browser.findElement(By.xpath('//*[@id="sea_creatures"]/tbody/tr[2]/td[6]')).getText();
      expect(first).toBe('15000');
    });
  });
});

describe('Check if month data is correct', () => {
  it('January sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('January');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in January')
    const description = await browser.findElement(By.css('h2')).getText();
    expect(description).toContain('Nothing new');
  });
  it('February sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('February');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in February');
    const description = await browser.findElement(By.css('h2')).getText();
    expect(description).toContain('Nothing new');
  });
  it('March sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('March');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in March');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Turban Shell');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('turban_shell.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Small [Slow]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('March - May\nSeptember - December');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('1000');
  });
  it('April sea_creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('April');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in April');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Lobster');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('lobster.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Large [Fast]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('April - June\nDecember - January');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('4500');
  });
  it('May sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('May');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in May');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Sea Urchin');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('sea_urchin.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Small [Slow]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('May - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('1700');
  });
  it('June sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('June');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in June');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Sea Grapes');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('sea_grapes.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Large [Stationary]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('June - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('900');
  });
  it('July sea_creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('July');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in July');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Moon Jellyfish');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('moon_jellyfish.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Small [Very Slow]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('July - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('600');
  });
  it('August sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('August');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in August');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Flatworm');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('flatworm.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Tiny [Very Slow]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('August - September');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('4 PM - 9 AM');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('700');
  });
  it('September sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('September');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in September');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Oyster');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('oyster.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Small [Slow]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('September - February');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('1100');
  });
  it('October sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('October');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in October');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Seaweed');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('seaweed.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Large [Stationary]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('October - July');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('600');
  });
  it('November sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('November');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in November');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Sea Cucumber');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('sea_cucumber.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Medium [Very Slow]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('November - April');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('500');
  });
  it('December sea creatures correct', async () => {
    await browser.findElement(By.css('select')).sendKeys('December');
    const button = browser.findElement(By.css('input'));
    await browser.wait(button.click());
    const header = await browser.findElement(By.css('h1')).getText();
    expect(header).toBe('New Sea Creatures in December');
    const name = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[1]')).getText();
    expect(name).toBe('Lobster');
    const image = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[2]/img')).getAttribute('src');
    expect(image).toContain('lobster.png');
    const shadow = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[3]')).getText();
    expect(shadow).toBe('Large [Fast]');
    const months_avail = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[4]')).getText();
    expect(months_avail).toBe('April - June\nDecember - January');
    const time_found = await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[5]')).getText();
    expect(time_found).toBe('All Day');
    const price = await await browser.findElement(By.xpath('//*[@id="newSea"]/tbody/tr[2]/td[6]')).getText();
    expect(price).toBe('4500');
  });
});


