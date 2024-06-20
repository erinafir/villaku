const { User, Villa, Location, UserProfile, UserVilla } = require("../models");
const rupiah = require("../helpers/index");
const bcrypt = require("bcryptjs");
const { Op, where } = require('sequelize');
let {mailOptions, transporter} = require('../index')

class Controller {

  static async home(req, res) {
    try {
      const { search } = req.query
      if (search) {
        let data = await Villa.getAllVilla(search);
        res.render("home", { data, rupiah });
      } else {
        let data = await Villa.getAllVilla();
        res.render("home", { data, rupiah });
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  static async dashboardAdmin(req, res) {
    try {
      let data = await Villa.findAll({include: Location});
      
      res.render("dashboardAdmin", { data, rupiah });
    } catch (error) {
      res.send(error);
    }
  }

  static async showMyVillas(req, res) {
    try {
      const { UserId } = req.params
      const { VillaId } = req.query
      await UserVilla.create({
        UserId: UserId,
        VillaId: VillaId
      })
      let user = await User.findOne({
        where: {
          id: +UserId
        }, include: Villa
      })
      let profile = await UserProfile.findOne({
        where: {
          id: +UserId
        }
      })
      let data = await Villa.findOne({
        where: {
          id: +VillaId
        }, include: Location
      })
      res.render('myVillas', { data, user, profile, rupiah })
    } catch (error) {
      res.send(error)
      console.log(error);
    }
  }

  static showRegister(req, res) {
    try {
      const { error } = req.query;
      res.render("register", { error });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async postRegister(req, res) {
    try {

      const { username, fullName, email, password, phoneNumber } = req.body;
      let newUser = await User.create({
        username: username,
        email: email,
        password: password,
      });
      let userProfile = await UserProfile.create({
        fullName: fullName,
        phoneNumber: phoneNumber,
        UserId: newUser.id,
      });
      mailOptions = {
        from: 'aetherdstorm@gmail.com',
        to: `${email}`,
        subject: 'Welcome to Villaku!',
        text: `Welcome to Villaku! We're so happy to have you here. Are you ready to rent by vibe?`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/villaku/register?error=${error}`);
      } else {
        res.send(error);
        console.log(error);
      }
    }

  }
  static showLogin(req, res) {
    try {
      const { error } = req.query;
      res.render("login-page", { error });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }


  static async postLogin(req, res) {
    try {
      const { username, password } = req.body
      let data = await User.findOne({ where: { username: username } })
      if (!data) throw new Error('please register first');
      const isValidPassword = bcrypt.compareSync(password, data.password);
      if (!isValidPassword) throw new Error('invalid username/password');
      req.session.userRole = data.role
      res.redirect(`/villaku/${data.id}`)
    } catch (error) {
      res.redirect(`/villaku/login?error=${error.message}`)
    }
  }

  static async redirectLogin(req, res) {
    try {
      const { UserId } = req.params
      const { sort } = req.query
      let user = await User.findByPk(+UserId , {include: UserProfile})
      
      if (sort) {
        let data = await Villa.findAll({
          order: [[sort, 'desc']]
        })
        res.render('redirect-home', { data, UserId, user, rupiah })
      } else {
        let data = await Villa.findAll()
        res.render('redirect-home', { data, UserId, user, rupiah })
      }
    } catch (error) {
      res.send(error)
      console.log(error);
    }
  }

  static async showFormAddVilla(req, res) {
    try {
      res.render('formAddVilla')
    } catch (error) {
      res.send(error.message)
    }
  }


  static async postAddVilla(req, res) {
    try {
      const { name, description, price, img_Url } = req.body
      await Villa.create({ name, description, price: +price, img_Url })
      res.redirect('/villaku/admin')
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map(el => el.message)
        res.redirect(`/villaku/register?error=${error}`)
      } else {
        res.send(error)
        console.log(error);
      }
    }
  }



  static async showFormEditVilla(req, res) {
    try {
      const { error } = req.query;
      let { VillaId } = req.params;
      let data = await Villa.findVillaById(VillaId);
      res.render("formEditVilla", { data: data, error });
    } catch (error) {
      res.send(error.message);

    }
  }

  static async postEditVilla(req, res) {
    try {
      let { name, description, price, img_Url } = req.body;
      let { VillaId } = req.params;
      await Villa.update(
        { name, description, price, img_Url },
        {
          where: {
            id: +VillaId,
          },
        }
      );
      res.redirect(`/villaku/admin`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(
          `/villaku/admin/${req.params.VillaId}/edit?error=${error}`
        );
      } else {
        res.send(error);
        console.log(error);
      }
    }
  }

  static async deleteVilla(req, res) {
    try {
      let { VillaId } = req.params;
      await Villa.destroy({
        where: {
          id: +VillaId,
        },
      });
      res.redirect(`/villaku/admin`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }


  static async logout(req, res) {
    try {
      req.session.destroy(function (err) {
        if (err) console.log(err);
      })
      res.redirect('/')
    } catch (error) {
      res.send(error.message)
    }
  }
}







module.exports = Controller;