const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded ({extended: true}))

app.get('/', Controller.home)
app.get('/villaku/register', Controller.showRegister)
app.post('/villaku/register', Controller.postRegister)
app.get('/villaku/login', Controller.showLogin)


app.listen(port, () => {
    console.log(`web berjalan di port ${port}`);
})