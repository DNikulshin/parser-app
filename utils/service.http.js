const {promises: fs} = require('fs')
const path = require('path')
require('dotenv').config()
const setCookies = require('./setCookies')
const fsSync = require('fs')
const chalk = require("chalk");
const {urlencoded} = require("express");
//const timer = require('timers/promises')

const Auth = async (page, email, password, type = '') => {
    try {
        //console.log('Auth type:', type)
        // await page.goto('https://hh.ru/', { waitUntil: 'networkidle2' })
        // await page.waitForNavigation()
        await page.goto(process.env.URL_LOGIN, {waitUntil: 'networkidle2'})
        // await page.waitForNavigation( {waitUntil: 'networkidle2'})


        //const navigationPromise = await page.waitForNavigation();
        // const test = await page.content()
        // console.log(test)
        //await fs.writeFile(path.resolve(__dirname, '..', 'TEST', 'test.html',),  test, 'utf8')
        // await page.waitForNavigation()
        // await timer.setTimeout(3000)
        // const employerProfile = await page.evaluate(() => {
        //     return document.querySelector('[data-qa="mainmenu_employerProfile"]')
        // })
        // await navigationPromise
        //  const employerProfile = await page.evaluate(() => {
        //      return document.querySelector('body')
        //  })
        //console.log(employerProfile, 'employerProfile')
        // console.log(employerProfile, 'employerProfile');
        //    if(employerProfile) return
        await page.waitForSelector('.account-login-page', {visible: true, timeout: 0})
        await page.evaluate(() => document.querySelector('[data-qa="login-input-username"]').value = "")
        // await page.click('[data-qa="login-input-username"]')
        await page.type('[data-qa="login-input-username"]', email)
        // await page.click('[data-qa="login-input-password"]')
        await page.type('[data-qa="login-input-password"]', password)
        await page.click('[data-qa="account-login-submit"]')
        await page.waitForSelector('[data-qa="mainmenu_employerProfile"]')
        const cookies = await page.cookies()
        // //await timer.setTimeout(3000)
        await fs.writeFile(path.resolve(__dirname, '..', 'cookies', `cookie-${email}.json`), JSON.stringify(cookies, null, 2))
        console.log(chalk.white.bgGreen.bold('writeCookie'));
        return ['Авторизован!']
    } catch (e) {
        console.log(e)
        console.log(chalk.white.bgRed.bold('writeCookie'));
        return ['Что-то пошло не так, попробуйте снова!']
    }
}


const GetData = async (page, URL, email, value, typeRequest = '') => {
    try {
        await setCookies(page, email)
        await page.goto(URL,{waitUntil: 'networkidle2'})
        const allLink = await page.$$eval('[data-qa="serp-item__title"]', item => item.map(el => el?.href?.split('?')[0]))
        console.log(allLink)

        for (const link of allLink) {
            await page.goto(link, {waitUntil: 'networkidle2'})
            const content = await page.$eval('.resume-applicant', item => item.innerText)
            await fs.writeFile(path.resolve(__dirname, '..', 'RESULT', typeRequest, `${value.toLowerCase()}-${link.split('/').pop()}.txt`), content)
        }
        return allLink

    } catch (e) {
        console.log(e)
        return ['Что-то пошло не так, попробуйте снова!']
    }
}
module.exports = {
    Auth, GetData
}


