const eventModel = require("../../models/events");
const domainModel = require("../../models/domains");

const convertDateAndTime = function (date, time) {};

const controller = {
  showAdminPage: async (req, res) => {
    const userEmail = req.query.user_email;
    const domainName = req.query.domain_name;

    // let eventData = await eventModel.find({});

    // console.log(eventData);
    // console.log("after event data found");

    res.render("pages/adminpage", { userEmail, domainName });
  },

  showUserPage: (req, res) => {
    res.render("pages/userpage");
  },

  inputEvent: async (req, res) => {
    const userEmail = req.query.user_email;
    console.log(userEmail);
    console.log("input email name");
    const domainName = req.query.domain_name;
    console.log(domainName);
    console.log("input domain name");
    const eventData = req.body;
    console.log(eventData);

    const eventMongo = await eventModel.find({});
    console.log(eventMongo);

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
        createdBy: userEmail,
        domain: domainName,
        title: eventData.eventTitle,
        start: eventStartMoment,
        end: eventEndMoment,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to submit event");
      return;
    }

    const routeQuery =
      "?" + "user_email=" + userEmail + "&domain_name=" + domainName;

    const currentRoute = routeQuery;

    res.redirect(currentRoute);
  },

  deleteEvent: async (req, res) => {
    // res.send("I am in delete route");
    const eventToDelete = req.body;
    const userEmail = req.query.user_email;
    const domainName = req.query.domain_name;

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
    const routeQuery =
      "?" + "user_email=" + userEmail + "&domain_name=" + domainName;

    const currentRoute = routeQuery;

    res.redirect(currentRoute);
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
    const userEmail = req.query.user_email;
    const domainName = req.query.domain_name;

    console.log("testingdomainname");
    console.log(eventID);
    console.log(domainName);
    console.log(userEmail);
    console.log("aftertestingdomainname");
    // const event = await eventModel.find({});

    // const requestedEventId = event[eventID]._id;

    // console.log(requestedEventId);

    const eventFindById = await eventModel.findByIdAndUpdate(eventID);

    console.log(eventFindById);

    console.log("testingdomain");

    res.render("pages/showeventpage", {
      eventFindById,
      eventID,
      userEmail,
      domainName,
    });
  },
  updateEvent: async (req, res) => {
    const eventID = req.params.event_id;
    const userEmail = req.query.user_email;
    const domainName = req.query.domain_name;
    console.log(eventID);
    const eventToUpdate = req.body;
    console.log(req.body);
    console.log("update event");

    const eventStart = new Date(
      eventToUpdate.startDateToUpdate +
        " " +
        eventToUpdate.updateEventStartTime +
        " UTC"
    );
    console.log(eventStart);
    const eventStartISO = eventStart.toISOString();
    console.log(eventStartISO);

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

    res.render("pages/showeventpage", {
      eventFindById,
      eventID,
      userEmail,
      domainName,
    });
  },
  deleteEventID: async (req, res) => {
    const eventID = req.params.event_id;
    const userEmail = req.query.user_email;
    const domainName = req.query.domain_name;

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
    res.render("pages/showeventpage", {
      eventFindById,
      eventID,
      userEmail,
      domainName,
    });
  },

  getAllEvent: async (req, res) => {
    const eventData = await eventModel.find({});
    console.log("before gather all event");
    console.log(eventData);
    console.log("test gather all event");
    res.json(eventData);
  },
};

module.exports = controller;
