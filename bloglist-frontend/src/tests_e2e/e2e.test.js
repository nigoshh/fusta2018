const puppeteer = require('puppeteer')

describe('blog app', () => {

  let browser, originalTimeout, page

  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 70
    })
    page = await browser.newPage()
  })

  afterEach(() => jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout)

  it('redirects logged in user to the page she asked for', async () => {
    await page.goto('http://localhost:3000/users')
    let textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('blog app')).toBe(true)
    expect(textContent.includes('log in')).toBe(true)
    await page.type('input[name=username]', 'Pape')
    await page.type('input[name=password]', 'biscotti')
    await page.click('form button')
    await page.waitForSelector('table')
    textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('Rino logged in')).toBe(true)
    expect(textContent.includes('blogs added')).toBe(true)
    browser.close()
  }, 15000)

  it('creates a blog and comments it', async () => {
    await page.goto('http://localhost:3000/blogs')
    let textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('blog app')).toBe(true)
    expect(textContent.includes('log in')).toBe(true)
    await page.type('input[name=username]', 'Pape')
    await page.type('input[name=password]', 'biscotti')
    await page.click('form button')
    await page.waitForSelector('button')
    textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('Rino logged in')).toBe(true)
    expect(textContent.includes('add blog')).toBe(true)
    let id
    do id = Math.floor(Math.random() * Math.floor(1000))
    while (textContent.includes(`${id} puppeteers blogg`))
    await page.click('button[name="add blog"]')
    await page.waitForSelector('input')
    await page.type('input[name=title]', `${id} puppeteers blogg`)
    await page.type('input[name=author]', 'pupp')
    await page.type('input[name=url]', 'fake')
    await page.click('form button')
    await page.waitForSelector('ul')
    textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes(`${id} puppeteers blogg`)).toBe(true)
    const comment = 'comm-men'
    expect(textContent.includes(comment)).toBe(false)
    await page.type('input', comment)
    await page.click('form button')
    await page.waitForSelector('li')
    textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes(comment)).toBe(true)
    browser.close()
  }, 35000)
})
