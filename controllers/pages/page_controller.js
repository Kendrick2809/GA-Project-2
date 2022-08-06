const eventModel = require("../../models/events");
const eventDatabase = require("../../models/find_data");

const controller = {
  showAdminPage: (req, res) => {
    res.render("pages/adminpage");
  },

  showUserPage: (req, res) => {
    res.render("pages/userpage");
  },

  inputEvent: async (req, res) => {
    const eventData = req.body;
    console.log(eventData);
    try {
      await eventModel.create({
        title: eventData.eventTitle,
        start: eventData.eventStartDate,
        end: eventData.eventEndDate,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to submit event");
      return;
    }

    res.redirect("/users/admin");
  },
};

module.exports = controller;
