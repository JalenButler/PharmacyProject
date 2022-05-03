const baseUrl = "https://localhost:5001/api";
var userURL = baseUrl + "/" + "Users";
var userList = [];
var userPerson = [];
var date = new Date();
var selectedDate = new Date();
date.setDate(1);

//This is entirely messy. However, it is needed because of page refreshes.
var localStorePerson = "";
var local = localStorage.getItem(localStorePerson);
var storedPerson = JSON.parse(local);
userPerson = storedPerson;


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

//Function to page contents 
function handleOnLoad() {
  renderCalendar();
  renderData(new Date().toDateString());
}

//Function to render calendar for the page
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
        if((day == new Date().getDate()) && (date.getMonth() == new Date().getMonth())){
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

//Function that changes the date on the page when a different day on the calendar is selected
function handleDateClick(day, month, year) {
  selectedDate = new Date(year, month, day);
  renderData(selectedDate.toDateString());
}

//Changes calendar to previous month
function handlePrevClick() {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

//Changes calendar to next month
function handleNextClick() {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

//Function to render right side of webpage
function renderData(selectedDate) {
  renderDate(selectedDate);
  renderButtons();
}

//Displays selected date from calendar above appt/avail/user data side
function renderDate(selectedDate) {
  var html = "";
  html += `<h3>Selected Date: ${selectedDate}</h3>`;
  document.getElementById("selected-date").innerHTML = html;
}

//Displays buttons to change data tables
function renderButtons() {
  var html = "";

  if(userPerson.userType == 1) { //Pharmacist
    html += `<button id="users" type="button" class="btn btn-secondary" onclick="showUsers(); renderCrud(1);">Users</button>`;
    html += `<button id="availabilities" type="button" class="btn btn-secondary" onclick="getAvailabilities(); renderCrud(2);">Availabilities</button>`;
    html += `<button id="appointments" type="button" class="btn btn-secondary" onclick="getAppointments(); renderCrud(3);">Appointments</button>`;
  }
  else if(userPerson.userType == 2) { //pharm tech
    html += `<button id="availabilities" type="button" class="btn btn-secondary" onclick="getAvailabilities()">Availabilities</button>`;
    html += `<button id="appointments" type="button" class="btn btn-secondary" onclick="getAppointments()">Appointments</button>`;
  }
  else if(userPerson.userType == 3 || userPerson.userType == 4) { //Customer & Delivery
    html += `<button id="availabilities" type="button" class="btn btn-secondary" onclick="getAvailabilities(); renderBook();">Availabilities</button>`;
    html += `<button id="appointments" type="button" class="btn btn-secondary" onclick="getAppointments(); renderCancel();">Appointments</button>`;
  }
  
  document.getElementById("button-row").innerHTML = html;
}


//Renders buttons to perform crud operations on data
function renderCrud(type) {
  var html = "";
  if(type == 1) {
    //Users
    html += `<button id="update" type="button" class="btn btn-secondary" onclick="">Update</button>`;
    html += `<button id="delete" type="button" class="btn btn-secondary" onclick="">Delete</button>`;
  }else if(type == 2) {
    //Availabilities
    html += `<button id="add" type="button" class="btn btn-secondary" onclick="renderAvailabilityForm()">Add</button>`;
    html += `<button id="update" type="button" class="btn btn-secondary" onclick="">Update</button>`;
    html += `<button id="delete" type="button" class="btn btn-secondary" onclick="renderDeleteForm()">Delete</button>`;
  }else if(type == 3) {
    //Appointments
    html += `<button id="delete" type="button" class="btn btn-secondary" onclick="">Delete</button>`;
  }
  document.getElementById("crud-controls").innerHTML = html;
}

//renders button to book an availability
function renderBook() {
  var html = "";
  html += `<button id="update" type="button" class="btn btn-secondary" onclick="">Book</button>`;
  document.getElementById("crud-controls").innerHTML = html;
}

//renders button to cancel an appointment
function renderCancel() {
  var html = "";
  html += `<button id="update" type="button" class="btn btn-secondary" onclick="">Cancel</button>`;
  document.getElementById("crud-controls").innerHTML = html;
}

//Breaks down date time into a comparable format
function parseDate(value) {
  var array = value.split('T');
  var tempDate = array[0].split('-');

  var hold = new Date(tempDate[0], tempDate[1] - 1, tempDate[2]);
  return hold;
}

//Breaks down date time into a readable time string
function parseTime(value) {
  var array = value.split('T');
  var tempDate = array[0].split('-');
  var tempTime = array[1].split(':');

  var temp = new Date(tempDate[0], tempDate[1] - 1, tempDate[2], tempTime[0], tempTime[1], tempTime[2]);
  var hold = temp.toTimeString();
  var split = hold.split(' ');

  var time = split[0];
  time = time.split(':'); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  var seconds = Number(time[2]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  }
  
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

  return timeValue;
}

//API call to get availabilities
function getAvailabilities() {
  var url = baseUrl + "/availability";
  let html = "";

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {
    html += `<table><tr><th>Availability ID</th><th>Pharmacist</th><th>Start</th><th>End</th></tr>`;
    
    json.forEach(availability => {
      var temp = parseDate(availability.startDateTime);
      var start = parseTime(availability.startDateTime);
      var end = parseTime(availability.endDateTime);

      if(temp.toDateString() == selectedDate.toDateString()) {
        html += `<tr>`;
        html += `<td>${availability.availID}</td>`;
        html += `<td>${availability.userId}</td>`;
        html += `<td>${start}</td>`;
        html += `<td>${end}</td>`;
        html += `</tr>`;
      }
    });
    html += `</table>`;
    
    console.log(html);
    var checking = "<table><tr><th>Availability ID</th><th>Pharmacist</th><th>Start</th><th>End</th></tr></table>";
    if(html == checking)
    {
      html = '<p> <b>No Availabilities have been made for this day.<b> </p>';
    }

    document.getElementById("right-table").innerHTML = html;
  }).catch(function(error){
    console.log(error);
  })
}

//API call to add/create a new availability
function addAvailability() {
  var url = baseUrl + "/availability";
  var start = formatDates(document.getElementById("start").value + ":00");
  var end = formatDates(document.getElementById("end").value + ":00");

  var sendObj = {
    userId: userPerson.userId,
    startDateTime: start,
    endDateTime: end
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Accept" : 'application/json',
      "Content-Type" : 'application/json',
    },
    body: JSON.stringify(sendObj)
  }).then((response) => {
    console.log(response);
    clearAvailabilityForm();
    getAvailabilities();
  })
}

//function to render form to create a new availability
function renderAvailabilityForm() {
  let destination = document.getElementById("form");
  let html = "";
  html += `<form onsubmit="return false;" method="post">`;
  html += `<label class="form-label" for="date">Availability Date:</label><br>`;
  html += `<input class="form-control" type="text" id="date" name="date" value="${selectedDate.toDateString()}" readonly><br>`;
  html += `<label class="form-label" for="start-time">Start Time:</label><br>`;
  html += `<input class="form-control" type="time" id="start" name="start" min="09:00" max="18:00" required><br>`;
  html += `<label class="form-label" for="end-time">End Time:</label><br>`;
  html += `<input class="form-control" type="time" id="end" name="end" min="09:00" max="18:00" required><br>`;
  html += `<button class="btn btn-dark" onclick="addAvailability()">Add Availability</button>`;
  html += `</form>`;

  destination.innerHTML = html;
}

//function to clear availability form after new availability is submitted
function clearAvailabilityForm() {
  document.getElementById("form").innerHTML = "";
}

//formats dates from form into a suitable value for the database
function formatDates(time) {
  if((selectedDate.getMonth() + 1) < 10){
    return selectedDate.getFullYear() + "-0" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate() + "T" + time;
  }
  else{
    return selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate() + "T" + time;
  }
}

//API call to delete an availability
function deleteAvailability() {
  let id = document.getElementById("toDelete").value;
  var url = baseUrl + "/availability/" + id;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Accept" : 'application/json',
      "Content-Type" : 'application/json',
    },
    body: JSON.stringify()
  }).then((response) => {
    console.log(response);
    clearAvailabilityForm();
    getAvailabilities();
  })
}

function renderDeleteForm() {
  let destination = document.getElementById("form");
  let html = "";
  html += `<form onsubmit="return false;" method="delete">`;
  html += `<label class="form-label" for="delete">Enter the ID of availability to delete:</label><br>`;
  html += `<input class="form-control" type="text" id="toDelete" name="date"><br>`;
  html += `<button class="btn btn-dark" onclick="deleteAvailability()">Delete Availability</button>`;
  html += `</form>`;

  destination.innerHTML = html;
}

//API call to update availability??


//API call to get users
function getUsers() {
 
  fetch(userURL).then(function(response){
    return response.json();
}) .then(function(json) {
    userList = json;
    console.log("This is getusers " + userList)
}).catch(function(error){
  console.log(error);
});
}

function showUsers() {
  let html = "";
  html += `<table><tr><th>User ID</th><th>Name</th><th>Email</th><th>Birthdate</th><th>Gender</th></tr>`;

  userList.forEach((user) => {
    html += `<tr>`;
    html += `<td>${user.userId}</td>`;
    html += `<td>${user.firstName} ${user.lastName}</td>`;
    html += `<td>${user.userName}</td>`;
    html += `<td>${user.userBirthdate}</td>`;
    html += `<td>${user.userGender}</td>`;
    html += `</tr>`
  })
  html += `</table`;

  document.getElementById("right-table").innerHTML = html;
}

//API call to add/create a new user
function addUser(){
var userGender = document.getElementById("gender").value;
var userBirthDate = document.getElementById("birthday").value;
var usertype;
var userName = document.getElementById("email").value;
var userPassword = document.getElementById("password").value;
var firstName = document.getElementById("firstname").value;
var lastName = document.getElementById("lastname").value;
//console.log(document.getElementById("email").value);
if(document.getElementById("title").value == "pharmacist")
{
  usertype = 1;
}
if(document.getElementById("title").value == "pharmacytech")
{
  usertype = 2;
}
if(document.getElementById("title").value == "customer")
{
  usertype = 3;
}
if(document.getElementById("title").value == "delivery"){
  usertype = 4;
}

console.log(firstName);
console.log(lastName);
console.log(userPassword);
console.log(usertype);
console.log(userBirthDate);
console.log(userGender);

alert("Your account was created successfully. Please Login to continue.");


  fetch(userURL, {
      method: "POST",
      headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
      },
      body: JSON.stringify({
          userGender: userGender,
          userBirthDate: userBirthDate,
          usertype: usertype,
          userName:userName,
          userPassword: userPassword,
          FirstName: firstName,
          LastName: lastName

      })
  })
  .then((response)=>{
      console.log(response)
      getUsers();
  }).catch(function(error){
    console.log(error);
  });


}

//API call to delete a user
function deleteUser() {

}

//API call to update a user
function updateUser() {

}

//API call to get appointments
function getAppointments() {
  var url = baseUrl + "/Appointment";
  let html = "";

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {
      console.log(json);
      console.log(userPerson)

    if(userPerson.userType == 1){
        

        html += `<table id = "customers"><tr><th>Time</th><th>Customer Name</th><th>Reason</th></tr>`;
        json.forEach(appointment => {
          var temp = parseDate(appointment.startDateTime);
          var start = parseTime(appointment.startDateTime);
          var end = parseTime(appointment.endDateTime)
          if(temp.toDateString() == selectedDate.toDateString()){
            html += `<tr>`;
            html += `<td>Start: ${start}   End: ${end}</td>`;
            console.log(appointment);
            console.log(userList)
            userList.forEach((person) =>{
                if(person.userType != 1 && appointment.custID == person.userId)
                {
                  html += `<td>${person.firstName} ${person.lastName}</td>`;
                  console.log(person.firstName)
                }
  
                console.log()
                html += `<td>${appointment.apptReason}</td>`;
                html += `</tr>`;
          })

          };
  

        });
        html += `</table>`;
      
    }
      console.log()
    //Customer View
    if(userPerson.userType == 2 || userPerson.userType == 3){

      html += `<table id="appointment"><tr><th>Time</th><th>Pharmacist Name</th><th>Reason</th></tr>`;
      json.forEach(appointment => {
        var temp = parseDate(appointment.startDateTime);
        temp = temp.toDateString();
        var start = parseTime(appointment.startDateTime);
        var end = parseTime(appointment.endDateTime)
        html += `<tr>`;
        html += `<td>Day: ${temp}\tStart: ${start}\tEnd: ${end}</td>`;
        console.log(appointment);
        userList.forEach((person) =>{
            if(person.userType == 1 && appointment.userId == person.userId)
            {
              html += `<td>${person.firstName} ${person.lastName}</td>`;
              console.log(person.firstName)
            }

            console.log()
        });

        html += `<td>${appointment.apptReason}</td>`;
        html += `</tr>`;
      });
      html += `</table>`;
    }
    console.log(html)
    var checking = '<table id = "customers"><tr><th>Time</th><th>Customer Name</th><th>Reason</th></tr></table>'
    if(html == checking)
    {
      html = '<p> <b>No appointments have been booked on this day.<b> </p>';
    }
   document.getElementById("right-table").innerHTML = html;
  }).catch(function(error){
    console.log(error);
  })
}

//API call to add/create appointment
function addAppointment() {
  var url = baseUrl + "/appointment";

var reason = document.getElementById("ApptReason").value;
var start = document.getElementById("startDateTime").value;
var end = document.getElementById("endDateTime").value ;

fetch(url, {
  method: "POST",
  headers: {
    "Accept" : 'application/json',
    "Content-Type" : 'application/json',
  },
 
}).then((response) => {
  console.log(response);
  getAppointments();
})

}

//API call to delete an appointment
function deleteAppointment() {
  let id = document.getElementById("toDelete").value;
  var url = baseUrl + "/appointment/" + id;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Accept" : 'application/json',
      "Content-Type" : 'application/json',
    },
  }).then((response) => {
    console.log(response);
    
    getAvailabilities();
  })
}

//API call to update an appointment
function updateAppointment() {

}

function loginUser(){
  console.log(userList);

  var loginUserN = document.getElementById("typeEmail").value;
  var loginP = document.getElementById("typePassword").value;
  found = false;

  userList.forEach((user) =>{
    if(user.userName == loginUserN && user.userPassword == loginP)
    {
        found = true;
        userPerson = user;
        const userString = userPerson
        const myJSON = JSON.stringify(userString)
        localStorage.setItem(localStorePerson, myJSON);
    }
  })

    if(found == true)
    {
      location.replace("index.html");
    }
    if(found == false){
      alert("The username or password is incorrect. Please try again.");
      document.getElementById("typeEmail").focus();
      document.getElementById("typeEmail").value = "";
      document.getElementById("typePassword").value = ""; 
  } 


}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
