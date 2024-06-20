const { User, Villa, Location, UserProfile } = require('../models')

class Controller {
    static async home(req, res){
        try {
            res.render('home')
        } catch (error) {
            res.send(error.message)
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