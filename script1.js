$(document).ready(function () {

    $('#btnAll').click(() => {
        // https://restcountries.eu/rest/v2/all
        $.get(`https://restcountries.eu/rest/v2/all/?fields=name;latlng;region;population`).then(function (data) {
            console.log(data);
            drawResultDiv(data);
            drawPopulationTable(data);
            drawRegionTable(data);


        })

    })
    $('#btnSearch').click(() => {
        let country = $('#search').val();
        $.get(`https://restcountries.eu/rest/v2/name/${country}`).then(function (data) {
            console.log(data);
            drawResultDiv(data);
            drawPopulationTable(data);
            drawRegionTable(data);
        })
    })


    function drawResultDiv(data) {
        $('#totalCountries').remove();
        let sumPopulation = 0;
        let totalCountries = 0;
        let average = 0;
        for (let i = 0; i < data.length; i++) {

            sumPopulation = sumPopulation + data[i].population
            average = sumPopulation / data.length
            totalCountries = data.length;
        }

        $('.container-fluid').append

            (`<div class="col-6" id="totalCountries">Total Countries Result:${totalCountries}<br>Total Countries Population:${sumPopulation}<br>Avarage:${average}</div>`)


    }



    function drawPopulationTable(data) {
        $('#countryPopulationTable').remove();
        $('.container-fluid').append(`<table id="countryPopulationTable" class="table table-striped">`);
        $('#countryPopulationTable').append(`<thead class="thead-dark">
        <tr>
            <th scope="col">Country Name</th>
            <th scope="col">Number Of Citizen</th>
           
        </tr>
    </thead> <tbody id="countries"></table>`)
        for (let i = 0; i < data.length; i++) {
            $('#countryPopulationTable').append(`<tr><td> ${data[i].name}</td> <td>${data[i].population}</td</tr>`)
        }
        $('#countryPopulationTable').append('</tbody></table>');

    }


    function drawRegionTable(data) {
        $('#regionTable').remove();
        const regions = {};
        data.forEach((item) => {
            if (regions[item.region]) {
                regions[item.region]++;
            } else {
                regions[item.region] = 1;
            }
        });
        $('.container-fluid').append('<table id="regionTable" class="table table-striped"></table>');
        $('#regionTable').append(`<thead class="thead-dark">
        <tr >
            <th scope="col">Region</th>
            <th scope="col">Number Of Countries</th>

        </tr>
        </thead> <tbody id="region">`);
        for (let key of Object.keys(regions)) {
            $("#regionTable").append(`
       
        <tr><td>${key}</td><td>${regions[key]}</td></tr>`);
        }
        $('#regionTable').append("</tbody></table>");

    }

    // $("#search").on("keyup", function () {
    //     let value = $(this).val().toLowerCase();
    //     $('table').filter(function () {
    //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    // });


    $('#search').val('');


})