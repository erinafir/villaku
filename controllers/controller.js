const { User, Villa, Location, UserProfile } = require('../models')
const rupiah = require('../helpers/index')
const UserVilla = require('../models/uservilla')
var bcrypt = require('bcryptjs');

class Controller {
    static async home(req, res) {
        try {
            let data = await Villa.getAllVilla()
            res.render('home', { data, rupiah })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async dashboardAdmin(req, res) {
        try {
            let data = await Villa.getAllVilla()
            res.render('dashboardAdmin', { data, rupiah })
        } catch (error) {
            res.send(error)
        }
    }

    static async book(req, res) {
        try {

        } catch (error) {
            res.send(error.message)
        }
    }

    static async logout(req, res) {
        try {
            res.redirect('/')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async showMyVillas(req, res) {
        try {
            let data = await Villa.getAllVilla()
            res.render('myvillas')
        } catch (error) {

        }
    }
    static showRegister(req, res) {
        try {
            const { error } = req.query
            res.render('register', {error})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async postRegister(req, res) {
        try {
            const { username, fullName, email, password, phoneNumber } = req.body
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
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => el.message)
                res.redirect(`/villaku/register?error=${error}`)
            } else {
            res.send(error)
            console.log(error);
            }
        }
    }
    static showLogin(req, res) {
        try {
            const { error } = req.query
            res.render('login-page', { error })
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async postLogin(req, res) {
        try {
            const { username, password } = req.body
            let data = await User.findOne({ where: { username: username } })
            if (!data) throw new Error('user does not exist');
            const isValidPassword = bcrypt.compareSync(password, data.password);
            if (!isValidPassword) throw new Error('invalid username/password');
            res.redirect('/')

        } catch (error) {
            res.redirect(`/villaku/login?error=${error.message}`)
        }
    }

    static async showFormAddVilla(req, res) {
        try {
            res.render('formAddVilla')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async deleteVilla(req, res) {
        try {
            let { VillaId } = req.params
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