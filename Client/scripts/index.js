const baseUrl = "https://localhost:5001/api";
var userURL = baseUrl + "/" + "Users";
var userList = [];
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

//Function to page contents 
function handleOnLoad() {
  renderData(new Date().toDateString());
  renderCalendar();
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
  var selected = new Date(year, month, day);
  renderData(selected.toDateString());
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

//Function
function renderData(selectedDate) {
  const data = document.getElementById("data");
  var html = "";
  html += `<div id="selected-date" class="row"><h3>Selected Date: ${selectedDate}</h3></div>`;



  data.innerHTML = html;
}

//API call to get availabilities
function getAvailabilities() {
  var url = baseUrl + "/availability";

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {

  }).catch(function(error){
    console.log(error);
  })
}

//API call to add/create a new availability
function addAvailability() {
  var url = baseUrl + "/availability";
}

//API call to delete an availability
function deleteAvailability(id) {
  var url = baseUrl + "/availability/" + id;
}

//API call to update availability??


//API call to get users
function getUsers() {
 
  fetch(userURL).then(function(response){
    return response.json();
}) .then(function(json) {
    userList = json;
}).catch(function(error){
  console.log(error);
});
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

}

//API call to add/create appointment
function addAppointment() {

}

//API call to delete an appointment
function deleteAppointment() {

}

//API call to update an appointment
function updateAppointment() {

}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
