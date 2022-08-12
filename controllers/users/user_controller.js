const bcrypt = require("bcrypt");
const userModel = require("../../models/users");
const domainModel = require("../../models/domains");
const userValidators = require("../validators/users");

const controller = {
  showRegistrationForm: (req, res) => {
    res.render("pages/register");
  },

  register: async (req, res) => {
    const validationResults = userValidators.registerValidator.validate(
      req.body
    );

    if (validationResults.error) {
      res.send(validationResults.error);
      return;
    }

    const validatedResults = validationResults.value;

    console.log(validationResults);
    console.log(validatedResults);
    console.log(validatedResults.password);
    console.log(validatedResults.confirm_password);

    if (validatedResults.password !== validatedResults.confirm_password) {
      res.send("passwords do not match");
      return;
    }

    const hash = await bcrypt.hash(validatedResults.password, 10);

    try {
      await userModel.create({
        name: validatedResults.fullname,
        email: validatedResults.email,
        hash: hash,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to create user");
      return;
    }

    res.redirect("/users/login");
  },

  showLoginForm: (req, res) => {
    res.render("pages/login");
  },

  login: async (req, res) => {
    // validations here ...
    const validatedResults = req.body;
    console.log(validatedResults);

    let user = null;

    try {
      user = await userModel.findOne({ email: validatedResults.email });
    } catch (err) {
      res.send("failed to get user");
      return;
    }

    const userEmail = user.email;

    console.log(userEmail);

    console.log(validatedResults.password);

    const pwMatches = await bcrypt.compare(
      validatedResults.password,
      user.hash
    );

    if (!pwMatches) {
      res.send("incorrect password");
      return;
    }

    // check selected radio button
    // const radioButtons = document.getElementByName("flexRadioDefault");
    // console.log(radioButtons);

    // log the user in by creating a session
    req.session.regenerate(function (err) {
      if (err) {
        next(err);
      }

      // store user information in session, typically a user id
      req.session.user = user.email;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }

        console.log(req.body.flexRadioDefault[0]);

        // validate login type

        if (validatedResults.flexRadioDefault[0] == "2") {
          const routeQuery = "?" + "user_email=" + userEmail;
          const userRoute = "users/user/domain" + routeQuery;
          res.redirect(userRoute);
        } else if (validatedResults.flexRadioDefault[0] == "1") {
          const routeQuery = "?" + "user_email=" + userEmail;
          const adminRoute = "/users/admin/domain" + routeQuery;
          res.redirect(adminRoute);
        }
      });
    });

    // res.send('login successful')
  },

  showAdminDomainPage: async (req, res) => {
    const userEmail = req.query.user_email;
    console.log(userEmail);
    const userFind = await userModel.findOne({ email: userEmail });

    console.log(userEmail);
    res.render("pages/admindomain", { userEmail });
  },

  setDomain: async (req, res) => {
    const userEmail = req.query.user_email;
    console.log("testing0");
    console.log(userEmail);
    console.log("testing1");

    const domainStatus = req.body;
    console.log(domainStatus);
    console.log(domainStatus.flexRadioDefault);

    const userFind = await userModel.findOne({ email: userEmail });
    console.log(userFind);
    console.log("testing2");

    if (domainStatus.flexRadioDefault == "1") {
      try {
        await domainModel.create({
          domain: domainStatus.domain,
          admin: userEmail,
        });
      } catch (err) {
        console.log(err);
        res.send("failed to create domain");
        return;
      }
    }

    console.log("success");

    const currentDomain = await domainModel.findOne({
      domain: domainStatus.domain,
    });

    const currentDomainName = currentDomain.domain;
    const routeQuery =
      "?" + "user_email=" + userEmail + "&domain_name=" + currentDomain.domain;

    const currentRoute = "/users/admin/domain/page" + routeQuery;

    res.redirect(currentRoute);
  },
};

module.exports = controller;
