const puppeteer = require('puppeteer')
module.exports = {
    headless: false,
    slowMo: 10,
    args: [
        '--start-maximized'
    ],
    defaultViewport: null,
    timeout: 1000 * 300,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: './userData',
}