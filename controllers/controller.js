const { User, Villa, Location, UserProfile } = require("../models");
const rupiah = require("../helpers/index");
const UserVilla = require("../models/uservilla");
const bcrypt = require("bcryptjs");

class Controller {
  static async home(req, res) {
    try {
      let data = await Villa.getAllVilla();
      res.render("home", { data, rupiah });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async dashboardAdmin(req, res) {
    try {
      let data = await Villa.getAllVilla();

      res.render("dashboardAdmin", { data, rupiah });
    } catch (error) {
      res.send(error);
    }
  }

  static async book(req, res) {
    try {
      res.redirect("/");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async showMyVillas(req, res) {
    try {
      let data = await Villa.findAll();
      res.render("myvillas", { data });
    } catch (error) {}
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
      await UserProfile.create({
        fullName: fullName,
        phoneNumber: phoneNumber,
        UserId: newUser.id,
      });
      const emailjs = require("emailjs-com");
      const templateParams = {
        to_email: email,
      };
      emailjs
        .send(
          "contact_service",
          "welcome_email",
          templateParams,
          "-OUQA3nFzhtZl9-Gs"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
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
      const { username, password } = req.body;
      let data = await User.findOne({ where: { username: username } });
      if (!data) throw new Error("user does not exist");
      const isValidPassword = bcrypt.compareSync(password, data.password);
      if (!isValidPassword) throw new Error("invalid username/password");
      req.session.userRole = data.role;
      res.redirect("/");
    } catch (error) {
      res.redirect(`/villaku/login?error=${error.message}`);
    }
  }

  static async showFormAddVilla(req, res) {
    try {
      res.render("formAddVilla");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postAddVilla(req, res) {
    try {
      const { name, description, price, img_Url } = req.body;
      await Villa.create({ name, description, price: +price, img_Url });
      res.redirect("/villaku/admin");
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
        res.redirect("/villaku/login");
      });
      res.redirect("/");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = Controller;
