const path = require('path')
const fsSync = require('fs')
const puppeteer = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
const {Auth, GetData} = require('../utils/service.http')
const settings = require('../utils/http.settings')
require('dotenv').config()
puppeteer.use(Stealth())


const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
const pathCookie = path.resolve(__dirname, '..', 'cookies', `cookie-${process.env.EMAIL}.json`)

async function init() {
    const browser = await puppeteer.launch(settings)
    const page = await browser.newPage()
    await page.setUserAgent(UserAgent)
    return {page, browser}
}

// async function startAuth(email, password, type) {
//     const {page, browser} = await init()
//     try {
//         await Auth(page, email, password, type)
//         await browser.close()
//     } catch (e) {
//         console.log(e)
//         await browser.close()
//     }
// }


async function startParse({URL, position, typeRequest}) {
    const {page, browser} = await init()
    try {
        if(!fsSync.existsSync(pathCookie)) {
            await Auth(page, typeRequest)
            const data = await GetData(page, URL, position, typeRequest)
            await browser.close()
            return data
        }
        const data = await GetData(page, URL, position, typeRequest)
        await browser.close()
        return data
    } catch (e) {
        console.log(e)
        await browser.close()
    }
}

module.exports = {
    startParse
}