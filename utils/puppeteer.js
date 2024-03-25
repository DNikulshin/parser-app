//const puppeteer = require('puppeteer')
const puppeteer = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
const fsSync = require('fs')
const path = require('path')
const {Auth, GetData} = require('../utils/service.http')
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
    return {page, browser}
}

async function startAuth(email, password, type) {
    const {page, browser} = await init()
    try {
        await Auth(page, email, password, type)
        await browser.close()
    } catch (e) {
        console.log(e)
        await browser.close()
    }
}

async function startParse(URL, email, value, typeRequest) {
    const {page, browser} = await init()
    try {
        const data = await GetData(page, URL, email, value, typeRequest)
        await browser.close()
        return data
    } catch (e) {
        console.log(e)
        await browser.close()
    }
}

module.exports = {
    startParse, startAuth
}