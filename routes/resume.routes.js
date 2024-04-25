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
        const { url, type, position} = req.body
        console.log('type: ' , type)
        console.log('url: ' , url)
        console.log('position: ', position)
        const data = await startParse({
            URL: url,
            position,
            typeRequest: type
        })
        res.json(data || [])
        return data || []

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
