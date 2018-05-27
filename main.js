"use strict";
google.charts.load('current', {'packages':['gauge']});




///Function that allows us to sort JSON content

var sortByProperty = function (property) {

    return function (x, y) {

        return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));

    };

};



function getAllRequests() {
    fetch("https://kea-alt-del.dk/customersupport/")
      .then(res => res.json())
      .then(showRequests)
  }
  
  function showRequests(data) {



  let list = document.querySelector("#wrapperJson");
  let template = document.querySelector("#requestTemplate").content;
  let clone = template.cloneNode(true);

  data = data.sort(sortByProperty('importance'));

  console.log(data);




  data.forEach(function(theRequest) {
      //Selecting elements from html document
    let clone = template.cloneNode(true);

    let names = clone.querySelector(".names");
    let date = clone.querySelector(".date");
    let desc = clone.querySelector(".desc");
    let impGauge = clone.querySelector("#chart_div");


    //selecting concrete elements from json
    let firstName = theRequest.first;
    // let middleName = theRequest.middleName;
    let middleName = ()=> {
        if(theRequest.middle == null)
         return "";
        else
        return theRequest.middle;}
    let lastName = theRequest.last;
    let importanceJson = theRequest.importance;
    let fullText = theRequest.full;

   let day = theRequest.time.day;

let hour  = theRequest.time.hour;

let minute  = theRequest.time.minute;

let month = theRequest.time.month;

let second = theRequest.time.second;

let year = theRequest.time.year;





    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Importance', importanceJson],
      ]);

      var options = {
        width: 400, height: 120,
        redFrom: 80, redTo: 100,
        yellowFrom:45, yellowTo: 80,
        minorTicks: 5
      };

      var chart = new google.visualization.Gauge(impGauge);

      chart.draw(data, options);

    }





                                            


    //filling document elements with json content
    names.textContent = ` ${firstName}  ${middleName()} ${lastName} `;
    desc.textContent =  `${fullText}`;
    date.textContent = `${day}.${month}.${year}   ${hour}:${minute}:${second}`

                                    // galleryImage.setAttribute("src", photo);
                                    // title.textContent = theRequest.title.rendered;
                                    // desc.textContent = excerpt;



    list.appendChild(clone);
  })



}

getAllRequests();



  