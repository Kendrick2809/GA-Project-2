// const eventModel = require("../../models/events");

// let event = eventModel.find({});

// console.log(event);
// const axios = require("axios");

const eventdata = axios({
  method: "get",
  url: "http://localhost:3000/events/all",
  responseType: "json",
}).then(function (response) {
  let Calendar = FullCalendar.Calendar;
  let Draggable = FullCalendar.Draggable;

  let containerEl = document.getElementById("external-events");
  let calendarEl = document.getElementById("calendar");
  let checkbox = document.getElementById("drop-remove");

  // initialize the external events

  new Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });

  // initialize the calendar

  let calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    timeZone: "UTC",
    themeSystem: "bootstrap5",
    selectable: true,
    editable: true,
    // droppable: true,
    // drop: function (info) {
    //   if (checkbox.checked) {
    //     info.draggedEl.parentNode.removeChild(info.draggedEl);
    //   }
    // },
    eventClick: function (info) {
      function isEventTitle(item) {
        return item.title === info.event.title;
      }

      let ID = response.data.find(isEventTitle)._id;

      window.location.href = "http://localhost:3000/users/admin/" + ID;
    },
    events: response.data,
    dateClick: function (info) {
      alert("clicked " + info.dateStr);
      calendar.changeView("timeGridDay", info.dateStr);
    },
    select: function (info) {
      alert("selected " + info.startStr + " to " + info.endStr);
    },
  });

  // let eventIdUpdate = document.getElementById("eventIdUpdate");

  // const event = response.data;
  // console.log(event);

  // const eventID = req.params.event_id;
  // console.log(eventID);

  // eventIdUpdate.innerText = event[0].title;

  calendar.render();
});

// document.addEventListener("DOMContentLoaded", function () {
//   let Calendar = FullCalendar.Calendar;
//   let Draggable = FullCalendar.Draggable;

//   let containerEl = document.getElementById("external-events");
//   let calendarEl = document.getElementById("calendar");
//   let checkbox = document.getElementById("drop-remove");

//   // initialize the external events

//   new Draggable(containerEl, {
//     itemSelector: ".fc-event",
//     eventData: function (eventEl) {
//       return {
//         title: eventEl.innerText,
//       };
//     },
//   });

//   // initialize the calendar

//   let calendar = new Calendar(calendarEl, {
//     headerToolbar: {
//       left: "prev,next today",
//       center: "title",
//       right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//     },
//     timeZone: "UTC",
//     themeSystem: "bootstrap5",
//     selectable: true,
//     editable: true,
//     droppable: true,
//     drop: function (info) {
//       if (checkbox.checked) {
//         info.draggedEl.parentNode.removeChild(info.draggedEl);
//       }
//     },
//     events: [],
//     dateClick: function (info) {
//       alert("clicked " + info.dateStr);
//     },
//     select: function (info) {
//       alert("selected " + info.startStr + " to " + info.endStr);
//     },
//   });

//   calendar.render();
// });
