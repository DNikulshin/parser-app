const { promises: fs } = require('fs')
const path = require('path')
require('dotenv').config()
const setCookies = require('./setCookies')
const fsSync = require('fs')
const timer = require('timers/promises')
const { log } = require('console')

const Auth = async (page, email, password) => {
    try {
        await page.goto(process.env.URL_LOGIN, { waitUntil: 'networkidle2' })
       // await page.waitForNavigation()
       // await timer.setTimeout(3000)
        //const employerProfile = await page.evaluate(() => {
           // return document.querySelector('[data-qa="mainmenu_employerProfile"]')
       // })
       // console.log(employerProfile, 'employerProfile')
       // console.log(employerProfile, 'employerProfile');
    //    if(employerProfile) return
        await page.waitForSelector('.account-login-page', { visible: true, timeout: 0 })
        await page.evaluate(() => document.querySelector('[data-qa="login-input-username"]').value = "")
        // await page.click('[data-qa="login-input-username"]')
        await page.type('[data-qa="login-input-username"]', email)
        // await page.click('[data-qa="login-input-password"]')
        await page.type('[data-qa="login-input-password"]', password)
        await page.click('[data-qa="account-login-submit"]')
        await page.waitForSelector('[data-qa="mainmenu_employerProfile"]')
        const cookies = await page.cookies()
        await timer.setTimeout(3000)
        await fs.writeFile(path.resolve(__dirname, '..', 'cookies', `cookie-${email}.json`), JSON.stringify(cookies, null, 2))
        return ['Авторизован!']
    } catch (e) {
        console.log(e)
        return ['Не авторизован!']
    }
}


const GetData = async (page, URL, email, value, typeRequest = '') => {
    console.log(typeRequest);
    try {
        await setCookies(page, email)
        await page.goto(URL)
        const allLink = await page.$$eval('[data-qa="serp-item__title"]', item => item.map(el => el?.href?.split('?')[0]))

        for (const link of allLink) {
            await page.goto(link)
            const content = await page.$eval('.resume-applicant', item => item.innerText)
            await fs.writeFile(path.resolve(__dirname, '..', 'RESULT', 'hh' , `${value.toLowerCase()}-${link.split('/').pop()}.txt`), content)
        }

        return allLink

    } catch (e) {
        console.log(e)
        return ['Не авторизован!']
    }
}

module.exports = {
    Auth, GetData
}


