const eventDatabase = require("../../models/find_data");
const eventData = eventDatabase.listEvent();

console.log(eventData);

document.addEventListener("DOMContentLoaded", function () {
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
    droppable: true,
    drop: function (info) {
      if (checkbox.checked) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },
    dateClick: function (info) {
      alert("clicked " + info.dateStr);
    },
    select: function (info) {
      alert("selected " + info.startStr + " to " + info.endStr);
    },
  });

  calendar.render();
});
