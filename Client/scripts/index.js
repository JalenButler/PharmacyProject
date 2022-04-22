const baseUrl = "";
var date = new Date();
date.setDate(1);


//Array holding string values of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Array holding string values of days of the week
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

//Array holding the values of the last day of each month
const daysInMonth = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];

function handleOnLoad() {
  renderData(new Date().toDateString());
  renderCalendar();
}


function renderCalendar() {
  
  const calendar = document.getElementById("calendar");
  const firstDay = date.getDay();
  let day = 1;
  let last = daysInMonth[date.getMonth() - 1] - (date.getDay() - 1);
  let next = 1;

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();

  var html = "";
  html += `<table>`;
  html += `<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>`;
  
  for (i = 0; i < 6; i++) {
    html += `<tr>`;
    for(j = 0; j < 7; j++){
      if(day == 1 && j != date.getDay()){
        html += `<td class="prev-month" onclick="handleDateClick(${last}, ${date.getMonth() - 1}, ${date.getFullYear()})">${last}</td>`;
        last++;
      }
      else if((day - 1) == daysInMonth[date.getMonth()]){
        html += `<td class="next-month" onclick="handleDateClick(${next}, ${date.getMonth() + 1}, ${date.getFullYear()})">${next}</td>`;
        next++;
      }
      else{
        if(day == new Date().getDate()){
          html += `<td class="today-cal" onclick="handleDateClick(${day}, ${date.getMonth()}, ${date.getFullYear()})">${day}</td>`;
        }else{
          html += `<td class="curr-month" onclick="handleDateClick(${day}, ${date.getMonth()}, ${date.getFullYear()})">${day}</td>`;
        }
        day++;
      }
    }
    html += `</tr>`;
  }

  html += `</table>`
  calendar.innerHTML = html;
}

function handleDateClick(day, month, year) {
  var selected = new Date(year, month, day);
  renderData(selected.toDateString());
}

function handlePrevClick() {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

function handleNextClick() {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

function renderData(selectedDate) {
  const data = document.getElementById("data");
  var html = "";
  html += `<div id="selected-date" class="row"><h3>Selected Date: ${selectedDate}</h3></div>`;

  data.innerHTML = html;
}

