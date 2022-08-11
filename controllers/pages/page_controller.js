const eventModel = require("../../models/events");

const convertDateAndTime = function (date, time) {};

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

    res.render("pages/adminpage");
  },

  showUserPage: (req, res) => {
    res.render("pages/userpage");
  },

  inputEvent: async (req, res) => {
    const eventData = req.body;

    if (
      !eventData.eventStartDate ||
      !eventData.eventEndDate ||
      !eventData.eventTitle
    ) {
      res.send("Event input not completed.");
    }

    const eventStartMoment = new Date(
      eventData.eventStartDate + " " + eventData.eventStartTime + " UTC"
    ).toISOString();
    const eventEndMoment = new Date(
      eventData.eventEndDate + " " + eventData.eventEndTime + " UTC"
    ).toISOString();

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

    // const event = await eventModel.find({});

    // const requestedEventId = event[eventID]._id;

    // console.log(requestedEventId);

    const eventFindById = await eventModel.findById(eventID);

    console.log(eventFindById);

    res.render("pages/showeventpage", { eventFindById });
  },
  updateEvent: async (req, res) => {
    const eventID = req.params.event_id;
    const eventToUpdate = req.body;
    const eventStart = new Date(
      eventToUpdate.startDateToUpdate +
        " " +
        eventToUpdate.updateEventStartTime +
        " UTC"
    );
    const eventStartISO = eventStart.toISOString();

    const eventEnd = new Date(
      eventToUpdate.endDateToUpdate +
        " " +
        eventToUpdate.updateEventEndTime +
        " UTC"
    );
    const eventEndISO = eventEnd.toISOString();

    const eventFindByIdAndUpdate = await eventModel.findByIdAndUpdate(eventID, {
      title: eventToUpdate.titleToUpdate,
      start: eventStartISO,
      end: eventEndISO,
    });

    const eventFindById = await eventModel.findByIdAndUpdate(eventID);

    res.render("pages/showeventpage", { eventFindById });
  },
  deleteEventID: async (req, res) => {
    const eventID = req.params.event_id;
    const eventFindById = await eventModel.findById(eventID);
    try {
      eventData = await eventModel.deleteOne({
        _id: eventID,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to find collection");
      return;
    }
    res.render("pages/showeventpage", { eventFindById });
  },
};

module.exports = controller;
