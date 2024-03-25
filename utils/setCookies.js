const { log } = require('console')
const { promises: fs } = require('fs')
const path = require('path')
const chalk = require('chalk')

async function setCookies(page, email) {
    try {
        const cookiesString = await fs.readFile(path.resolve(__dirname, '..', 'cookies', `cookie-${email}.json`))
        if (cookiesString) {
            const setCookies = JSON.parse(cookiesString.toString())
            await page.setCookie(...setCookies)
            console.log(chalk.white.bgGreen.bold('setCookie'));
        }
       
    } catch (e) {
        console.log(chalk.white.bgRed.bold('setCookie'));
        throw e
    }

}

module.exports = setCookies