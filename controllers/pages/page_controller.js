const eventModel = require("../../models/events");

const controller = {
  showAdminPage: async (req, res) => {
    let eventData = null;

    try {
      eventData = await eventModel.find({});
    } catch (err) {
      console.log(err);
      res.send("failed to find collection");
      return;
    }

    console.log(eventData);
    console.log("after event data found");

    res.render("pages/adminpage", eventData);
  },

  showUserPage: (req, res) => {
    res.render("pages/userpage");
  },

  inputEvent: async (req, res) => {
    const eventData = req.body;
    const eventStartMoment =
      eventData.eventStartDate + "T" + eventData.eventStartTime + ":00.000Z";
    const eventEndMoment =
      eventData.eventEndDate + "T" + eventData.eventEndTime + ":00.000Z";
    try {
      await eventModel.create({
        title: eventData.eventTitle,
        start: eventStartMoment,
        end: eventEndMoment,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to submit event");
      return;
    }

    res.redirect("/users/admin");
  },

  deleteEvent: async (req, res) => {
    // res.send("I am in delete route");
    const eventToDelete = req.body;

    console.log(eventToDelete);
    console.log("start2");
    console.log(eventToDelete.titleToDelete);

    let eventData = null;

    try {
      eventData = await eventModel.find({});
    } catch (err) {
      console.log(err);
      res.send("failed to find collection");
      return;
    }

    console.log(eventData);

    try {
      eventData = await eventModel.deleteOne({
        title: eventToDelete.titleToDelete,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to find collection");
      return;
      // }
      // let event = eventModel.deleteOne({
      //   title: eventToDelete.titleToDelete,
      // });
    }

    res.redirect("/users/admin");
  },

  showEventPage: async (req, res) => {
    // const eventID = req.params.event_id;

    // console.log(eventID);

    // let eventData = null;

    // try {
    //   eventData = await eventModel.find({});
    // } catch (err) {
    //   console.log(err);
    //   res.send("failed to find collection");
    //   return;
    // }

    // const specificEvent = eventData[eventID];
    // console.log(specificEvent);

    const eventID = req.params.event_id;

    const event = await eventModel.find({});

    const requestedEventId = event[eventID]._id;

    console.log(requestedEventId);

    const eventFindById = await eventModel.findById(requestedEventId);

    console.log(eventFindById);

    res.render("pages/showeventpage", { eventFindById });
  },
};

module.exports = controller;
