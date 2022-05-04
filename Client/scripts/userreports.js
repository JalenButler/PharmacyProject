// const baseUrl = "https://localhost:5001/api";
var userReports = [];
function getUserReports(){
        var url = baseUrl + "/Appointment/api/Appointment/Reports";
      
        fetch(url).then(function(response) {
          return response.json();
        }).then(function(json) {
            userReports = json;
            console.log(json);

            
             for(let i = 0; i < userReports.length; i++){
                console.log(userReports[i].apptReason);
             }
             userInfo();
})};

function userInfo(){
 var years = []
 var year = userReports[0].year
 years[0] = year
 for(let j = 1; j<userReports.length; j++){
    if(userReports[j].year != year)
    {
        years[j] = userReports[j].year
        year = userReports[j].year
    }
 }
var count = 0;
var yearss = 2019
    var xValues = [];
    var yValues = [];
for(let k = 0; k < years.length; k++){
    var currYear = years[k]
    for (let i =0; i <userReports.length; i++){
        if(userReports[i].year == currYear){
            xValues[count]= userReports[i].apptReason;
            yValues[count] = userReports[i].count;
            count++;
        }
    }
    Meep(xValues, yValues, currYear)
}
}

function Meep(xValues, yValues, Date){

    var div =  document.createElement("div");
     div.innerHTML = `<canvas id='myChart${Date}' style="width:auto;max-width:500px;  margin-left: auto;
     margin-right: auto;
     width: 50%;"></canvas>`

    document.getElementById("information").appendChild(div);


    var barColors = ["red", "green","blue","orange","brown"];
    new Chart(`myChart${Date}`, {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: `Customer Reports ${Date}`
          }
        }
      });
}