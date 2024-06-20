const { User, Villa, Location, UserProfile } = require('../models')
const rupiah = require('../helpers/index')

class Controller {
    static async home(req, res){
        try {
            let data = await Villa.getAllVilla()
            res.render('home', {data, rupiah})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async dashboardAdmin(req,res){
        try {
            let data = await Villa.getAllVilla()
            res.render('dashboardAdmin')
        } catch (error) {
            res.send(error)
        }
    }
    static async showRegister(req, res){
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
}

module.exports = Controller 