const platform = require('os').platform()
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
    executablePath: platform === 'linux' ? puppeteer.executablePath() :  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: './userData',
}