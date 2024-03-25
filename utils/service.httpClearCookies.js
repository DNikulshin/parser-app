const fs = require('fs')
const path = require('path')

async function serviceHttpClearCookies (login) {
    const pathCookie = path.resolve(__dirname, '..', 'cookies', `cookie-${login}.json`)
    await fs.truncate(pathCookie, 0, function(){console.log('ClearCookies')})
}

module.exports = serviceHttpClearCookies