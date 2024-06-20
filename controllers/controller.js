const { User, Villa, Location, UserProfile } = require('../models')
const rupiah = require('../helpers/index')
const UserVilla = require('../models/uservilla')

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
            res.render('dashboardAdmin', {data, rupiah})
        } catch (error) {
            res.send(error)
        }
    }

    static async book(req,res){
        try {

            res.redirect('/')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async logout(req,res){
        try {
            res.redirect('/')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async showMyVillas(req,res){
        try {
            let data = await Villa.getAllVilla()
            res.render('myvillas')
        } catch (error) {
            
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
    static async postRegister(req, res){
        try {
            const { username, fullName, email, password, phoneNumber} = req.body
            let newUser = await User.create({
                username: username,
                email: email,
                password: password
            })
            await UserProfile.create({
                fullName: fullName,
                phoneNumber: phoneNumber,
                UserId: newUser.id
            })
            res.redirect('/')
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async showLogin(req, res){
        try {
            res.render('login-page')
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }

    static async showFormAddVilla(req,res){
        try {
           res.render('formAddVilla') 
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postAddVilla(req,res){
        try {
            const {name, description, price, img_Url} = req.body
            await Villa.create({name, description, price, img_Url})
            res.redirect('/')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async showFormEditVilla(req,res){
        try {
            res.render('formEditVilla')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postEditVilla(req,res){
        try {
            let {name, description, price, img_Url} = req.body
            let { VillaId } = req.params
            await Villa.update({name, description, price, img_Url})
            res.redirect(`/villaku/admin/${VillaId}/edit`)
        } catch (error) {
            res.send(error.message)
        }
    }

    static async deleteVilla(req,res){
        try {
            let { VillaId } =  req.params
            // console.log(Villa.findAll({
            //     include: uservilla
            // }));
            // await .destroy({
            //     where: {
            //         id: VillaId
            //     }
            // })
            // res.redirect(`/villaku/${VillaId}/delete`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller 