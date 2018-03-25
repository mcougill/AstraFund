

$(document).ready(function () {

    var database = firebase.database();

    var spectraRef = database.ref('spectraType');

    var userRef = database.ref('users');

    spectraRef.on("value", gotData, errData);

    //Asteroid Object
    var asteroidObj =
        [{
            "name": "Ryugu",
            "Type": "Cg",
            "a": "1.190",
            "e": "0.190",
            "value": "82.76 billion",
            "estProfit": "30.07 billion",
            "velocity": "4.664",
            "moid": "0.000083",
            "Group": "APO",
            "sharePrice": 10
        },
        {
            "name": "1989 ML",
            "Type": "X",
            "a": "1.272",
            "e": "0.137",
            "value": "13.94 billion",
            "estProfit": "4.38 billion",
            "velocity": "4.889",
            "moid": "0.082029",
            "Group": "AMO",
            "sharePrice": 20
        },
        {
            "name": "Nereus",
            "Type": "Xe",
            "a": "1.489",
            "e": "0.360",
            "value": "4.71 billion",
            "estProfit": "1.39 billion",
            "velocity": "4.985",
            "moid": "0.003260",
            "Group": "APO",
            "sharePrice": 30
        },
        {
            "name": "Bennu",
            "Type": "B",
            "a": "1.126",
            "e": "0.204",
            "value": "669.96 million",
            "estProfit": "185.00 million",
            "velocity": "5.096",
            "moid": "0.003223",
            "Group": "APO",
            "sharePrice": 40
        },
        {
            "name": "Didymos",
            "Type": "Xk",
            "a": "1.644",
            "e": "0.384",
            "value": "62.25 billion",
            "estProfit": "16.41 billion",
            "velocity": "5.162",
            "moid": "0.039291",
            "Group": "APO",
            "sharePrice": 50
        }];

        //build CAF array. 
        var accessibility= [];
        for (i=0;i<asteroidObj.length;i++){
            accessibility.push(asteroidObj[i].moid*asteroidObj[i].velocity*10);
            //Campodonico Accessibiility Factor (or the CAF)
            accessibility.push(asteroidObj[i].moid*asteroidObj[i].velocity);
            console.log(accessibility);

        }


/*plot*/
    // var data = [trace1, trace2];

    // var layout = {
    //     title: "THIS IS A PLACEHOLDER CHART",
    //     showLegend: true,
    //     height: 400,
    //     width: 715,
    //     xaxis: {
    //         title: 'Price per Share',
    //     },
    //     yaxis: {
    //         title: 'Estimated Profit',

          
        

    //on functions for firebase
    function gotData(snapshot) {

        $("#spectra").empty();

        var spectra = snapshot.val();
        console.log(spectra);
        var keys = Object.keys(spectra);
        console.log(keys);

        for (i = 0; i < keys.length; i++) {
            console.log(keys[i]);

            $("#spectra").append("<option>" + keys[i])

        };

    };

    function errData(err) {
        console.log("error!");
        console.log(err);
    }

    $("#userSubmit").on("click", function (e) {
        e.preventDefault();

        var userName = $("#userName-input").val().trim();

        var date = $("#date-input").val();

        var investAmt = $("#investment-input").val().trim();

        var spectra = $("#spectra").val();

        if (userName === "" || date === "" || investAmt === "" || investAmt <= 0) {
            console.log('all fields need to be filled');
        } else {
            var user = {
                userName:userName,
                date:date,
                investAmt:investAmt,
                spectra:spectra,
            };

            userRef.push(user)
            
            $(".table-input").val("");

            console.log(user);

            for (i=0;i<asteroidObj.length;i++){
                if (asteroidObj[i].Type===user.spectra){
                    console.log("yessir");
                    console.log(asteroidObj[i].sharePrice);
                    if (user.investAmt < asteroidObj[i].sharePrice){
                        console.log("you do not have sufficient funds to invest in one share of this asteroid type");
                    }else{
                        var numOfShares = Math.floor(user.investAmt/asteroidObj[i].sharePrice);
                        console.log(numOfShares);
                    }
                }else{}
            }
        }
    });

    /*pie chart*/
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Invest1', 11],
            ['Invest2', 2],
            ['Invest3', 2],
            ['Invest4', 2],
            ['Invest5', 7]
        ]);

        var options = {
            title: 'Investment',
            pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }
});

 //build asteroid price graph

 var trace1 = {
    x: [0.0038711199999999996, 4.010397810000001, 0.16251100000000002, 0.16424408000000001, 2.02820142],
    y: [10,20,30,40,50],
    text: ['Asteroid1', 'Asteroid2', 'Asteroid3', 'Asteroid4'],
    mode: 'markers',
    marker: {
        size: [100, 250, 500, 1000],
        sizemode: 'area'
    }
};

var data = [trace1];

var layout = {
    title: "Available Asteroids",
    showLegend: true,
    height: 400,
    width: 650,
    xaxis: {
        title: 'Accessibility Factor (CAF)',
    },
    yaxis: {
        title: 'Price per Share (USD)',
    }
};


Plotly.newPlot('productTitle', data, layout);