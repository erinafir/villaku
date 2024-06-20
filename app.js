const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const session = require('express-session')
const {checkAdmin} = require('./helpers/index')
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'mau tau aje',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
        sameSite: true
     }
  }))

app.get('/', Controller.home)

app.get('/villaku/register', Controller.showRegister)
app.post('/villaku/register', Controller.postRegister)

app.get('/villaku/login', Controller.showLogin)
app.post('/villaku/login', Controller.postLogin)

app.use((req, res, next) => {
    if (!req.session.userRole) {
        const error = 'Please login first!'
        res.redirect(`/villaku/login?error=${error}`)
    }
    next()
})

app.get('/villaku/admin', checkAdmin, Controller.dashboardAdmin)

app.get('/villaku/:UserId/rented', Controller.showMyVillas)

// app.get('/profile/:profileId', Controller)
// app.get('/profile/:profileId/edit', Controller)
// app.post('/profile/:profileId/edit', Controller) 
// app.get('/profile/:profileId/delete', Controller)


app.get('/villaku/admin/add', checkAdmin, Controller.showFormAddVilla)
app.post('/villaku/admin/add', checkAdmin, Controller.postAddVilla)


app.get('/villaku/admin/:VillaId/edit', checkAdmin, Controller.showFormEditVilla)
app.post('/villaku/admin/:VillaId/edit', checkAdmin, Controller.postEditVilla)

app.get('/villaku//admin/:VillaId/delete', checkAdmin, Controller.deleteVilla)

app.get('/villaku/logout', Controller.logout)


app.listen(port, () => {
    console.log(`web berjalan di port ${port}`);
})


