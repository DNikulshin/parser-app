require('dotenv').config()
const { Router, json } = require('express')
const { startParse, startAuth } = require('../utils/puppeteer')
const router = Router()

router.post('/auth', async (req, res) => {
    try {
        const { email, password, type } = req.body
        await startAuth(email, password, type)
    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/search', async (req, res) => {
    try {
        //console.log(process.env);
        const { value, email , type} = req.body
        console.log('type: ' , type)
        const data = await startParse(process.env.SEARCH_URL + process.env.PARAMS + `&text=${value}`, email, value, type)
        res.json(data)
        return json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
