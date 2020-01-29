place=JSON.parse(localStorage.getItem("place"))

const makeChart = ({ live_population }, element) => {
    element.find('#myChart').remove(); // this is my <canvas> element
    element.find('.chartDiv').append('<canvas id="myChart" width="180" height="150"></canvas>');
    console.log(live_population)
    if (live_population['live_height']==null) {
        return null
    }
    var ctx = element.find('#myChart')[0].getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: ['זמן אמת', 'בדרך כלל'],
    datasets: [{
        label: '',
        data: [live_population['live_height'].toString().slice(0, 5), live_population['usual_height']],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
    },

    options: {
    responsive: false,
    legend: {
    display: false
    },
    title: {
        display: false,
    },

    scales: {
        yAxes: [{
            gridLines: {
                display: true,
                drawBorder: true,

            },
            ticks: {
                beginAtZero: true,
                display: false,
            },

        }],
        xAxes: [{
            gridLines: {
                display: false,
                drawBorder: false,

            },
            ticks: {
                beginAtZero: true,
            },

        }],
    }
    }
    });

    return myChart
}

