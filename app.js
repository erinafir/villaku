const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded ({extended: true}))

app.get('/', Controller.home)
app.get('/villaku/admin', Controller.dashboardAdmin)

app.get('/villaku/register', Controller.showRegister)
app.post('/villaku/register', Controller.postRegister)

app.get('/villaku/login', Controller.showLogin)
app.post('/villaku/login', Controller.postLogin)
app.get('/villaku/logout', Controller.logout)

app.get('/villaku/:UserId/rented', Controller.showMyVillas)

// app.get('/profile/:profileId', Controller)
// app.get('/profile/:profileId/edit', Controller)
// app.post('/profile/:profileId/edit', Controller) 
// app.get('/profile/:profileId/delete', Controller)

app.get('/villaku/admin/add', Controller.showFormAddVilla)
app.post('/villaku/admin/add', Controller.postAddVilla)

app.get('/villaku/admin/:VillaId/edit', Controller.showFormEditVilla)
app.post('/villaku/admin/:VillaId/edit', Controller.postEditVilla) 

app.get('/villaku//admin/:VillaId/delete', Controller.deleteVilla)




app.listen(port, () => {
    console.log(`web berjalan di port ${port}`);
})


