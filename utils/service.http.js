const {promises: fs} = require('fs')
const path = require('path')
require('dotenv').config()
const setCookies = require('./setCookies')
const fsSync = require('fs')
const chalk = require("chalk")
const { parse } = require('node-html-parser')
//const timer = require('timers/promises')

const Auth = async (page, type = '') => {
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
        await page.click('[data-qa="login-input-username"]')
        await page.$eval('[data-qa="login-input-username"]', (el)  => el.value = '')
        await page.type('[data-qa="login-input-username"]', process.env.EMAIL, {delay: 100})
        await page.click('[data-qa="login-input-password"]')
        await page.type('[data-qa="login-input-password"]', process.env.PASSWORD, {delay: 100})
        await page.click('[data-qa="account-login-submit"]')
        await page.waitForSelector('[data-qa="mainmenu_employerProfile"]')
        const cookies = await page.cookies()
        // //await timer.setTimeout(3000)
        await fs.writeFile(path.resolve(__dirname, '..', 'cookies', `cookie-${process.env.EMAIL}.json`), JSON.stringify(cookies, null, 2))
        console.log(chalk.white.bgGreen.bold('writeCookie'));
        //return ['Авторизован!']
    } catch (e) {
        console.log(e)
        console.log(chalk.white.bgRed.bold('writeCookie'));
        return ['Что-то пошло не так, попробуйте снова!']
    }
}



const GetData = async ({page, URL, typeRequest = ''}) => {
    try {
        let flag = true
        let counter = 0
        let allLink = []
        let item
        await setCookies(page, process.env.EMAIL)
       await page.goto(`${URL}&page=${counter}`, {waitUntil: 'networkidle2'})
       // allLink = await page.$$eval('[data-qa="serp-item__title"]', item => item.map(el => el?.href?.split('?')[0])
            const pageCount = await page.$$eval('.pager > span', item => item.map(el => el.innerText).pop() || 0)
        if(pageCount >= 0) {
            while (flag) {
                await page.goto(`${URL}&page=${counter}`, {waitUntil: 'networkidle2'})
              // item = await page.$$eval('[data-qa="resume-serp__resume"]', item => item.innerHTML)


               // return {
               //  title: document.querySelectorAll('[data-qa="serp-item__title"]'),
               //     link: document.querySelector('[data-qa="serp-item__title"]')?.href?.split('?')[0],
               //    dateUpdate: document.querySelector('[data-qa="resume-serp__resume"]')?.innerText?.split('\n')[1] || null
               // }

                // })
               // const test = await page.$$eval('[data-qa="resume-serp__resume"]', item => item.map(el => el.innerHTML))
                //const htmlString = test;
                //const root = parse(test);

               // console.log(root.querySelectorAll('a')[0].rawAttrs.);
                //console.log(test)
                allLink.push(...await page.$$eval('[data-qa="serp-item__title"]', item => item.map(el => el?.href?.split('?')[0])))
                if(counter >= pageCount) flag = false
                console.log( 'counter :', counter, 'pageCount :', +pageCount)
                counter++

            }
           // console.log(item, 'item')
        }

       // await page.goto(`${URL}&page=${counter}`, {waitUntil: 'networkidle2'})
        //const item = await page.evaluate(() => {
         //   return document.querySelector('[data-qa="serp-item__title"]')

       // })
      //  const dateUpdate = await page.$$eval('[data-qa="resume-serp__resume"]',  item => item.map(el => {
        //    return {
             //   element: el.innerText.split('\n')[1]
         //   }
      //  }))



       // console.log('dateUpdate :', dateUpdate)
        //allLink.push(...await page.$$eval('[data-qa="serp-item__title"]', item => item.map(el => el?.href?.split('?')[0])))

        console.log(pageCount)
        // for (const link of allLink) {
        //   await page.goto(link, {waitUntil: 'networkidle2'})
        // const content = await page.$eval('.resume-applicant', item => item.innerText)

        //  const words  = ['ozon', 'wildberries']
        //   for(const word of words) {
        // if(content.toLowerCase().includes(word)){
        //  console.log(content, 'link :', link)
        //}
        // }
        //console.log(content.toLowerCase().includes('автотрэйд'), 'link :', link)


         await fs.writeFile(path.resolve(__dirname, '..', 'RESULT', typeRequest, `${new Date().toLocaleString()}.json`), JSON.stringify(allLink, null, 2))
        //}
        console.log(allLink, 'allLink')
        return allLink

    } catch (e) {
        console.log(e)
        return ['Что-то пошло не так, попробуйте снова!']
    }
}
module.exports = {
    Auth, GetData
}


