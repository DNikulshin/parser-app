//const puppeteer = require('puppeteer')
const puppeteer = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
const fsSync = require('fs')
const path = require('path')
const { Auth, GetData } = require('../utils/service.http')
const settings = require('../utils/http.settings')
//const setCookies = require('./setCookies')
require('dotenv').config()
//puppeteer.use(require('puppeteer-extra-plugin-session').default());
puppeteer.use(Stealth())


const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'

async function init() {
    const browser = await puppeteer.launch(settings)
    const page = await browser.newPage()
    await page.setUserAgent(UserAgent)
    //const sessionData = await page.session.dump();
    // await page.session.restore(sessionData); 
    // console.log(sessionData, 'sessinData');
    return { page, browser }
}

async function startAuth(email, password) {
    const { page, browser } = await init()
    try {
        await Auth(page, email, password)
        await browser.close()
    } catch (e) {
        console.log(e)
        await browser.close()
    }
    browser.close()
}

async function startParse(URL, email, value, typeRequest = '') {
    const { page, browser } = await init()
    try {

        // if(!isAuth) {
        //     return 'Нет авторизации!'
        // }
        //const pathCookie = path.resolve(__dirname, '..', 'cookies', `cookie-${email}.json`)

        // if(!fsSync.existsSync(pathCookie)) {
        //     await Auth(page, login, password)
        //     const data = await GetData(page, URL, login, typeRequest)
        //              //await browser.close()
        //              return data
        // }
        // const cookiesFile = fsSync.statSync(pathCookie)
        // if(cookiesFile.size === 0) {
        //     await Auth(page, login, password)
        //    const data = await GetData(page, URL, login, typeRequest)
        //    //await browser.close()
        //    return data
        // }
        const data = await GetData(page, URL, email, value, typeRequest = '')
        await browser.close()
        return data
    } catch (e) {
        console.log(e)
        await browser.close()
    }
    browser.close()
}

module.exports = {
    startParse, startAuth
}