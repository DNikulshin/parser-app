require('dotenv').config()
const { Router, json } = require('express')
const { startParse, startAuth } = require('../utils/puppeteer')
//const clearCookies = require('../utils/service.httpClearCookies')
//const { Auth } = require('../utils/service.http')
const router = Router()

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body

        await startAuth(email, password)
    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/hh', async (req, res) => {
    try {
        //console.log(process.env);
        const { value, email } = req.body
        console.log(email, 'email');
        const data = await startParse(process.env.SEARCH_URL + process.env.PARAMS + `&text=${value}`, email, value, 'hh')
        console.log(data);
        res.json(data)
        return json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// router.post('/avito', async (req, res) => {
//     try {
//         //console.log(process.env);
//         const { value, email } = req.body
//         console.log(email, 'email');
//         const data = await startParse(process.env.SEARCH_URL + process.env.PARAMS + `&text=${value}`, email, value, 'avito')
//         console.log(data);
//         res.json(data)
//         return json(data)

//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
// })
// router.post('/clear-cookies', async (req, res) => {
//     try {
//         const { login } = req.body
//         const clear_cookies = await clearCookies(login)
//         res.json(clear_cookies)

//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
// })

module.exports = router
