require('dotenv').config()
const { Router, json } = require('express')
const { startParse } = require('../utils/puppeteer')
const router = Router()

// router.post('/auth', async (req, res) => {
//     try {
//         const { email, password, type } = req.body
//         await startAuth(email, password, type)
//     } catch (e) {
//         return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
// })

router.post('/search', async (req, res) => {
    try {
        //console.log(process.env);
        const { position = 'Сантехник', tag = 'ozon', region = 1, period= 7,  type, url} = req.body
        console.log('type: ' , type)
        console.log('url: ' , url)
        const data = await startParse({
            //URL: process.env.SEARCH_URL + process.env.PARAMS + `&search_period${period}`+ `area=${region}` + `&text=!${position} "${tag}"`,
            URL: url,
            position,
            type
        })
        res.json(data)
        return data

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
