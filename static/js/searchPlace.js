// const getLive = (placeName) => {
//     const fetchingUrl = `http://localhost:9090/?name=${placeName}`
//     console.log(fetchingUrl)
// }

const loadIndexStyle = () => {
    document.getElementById("populationImg").style.display = 'none';
    document.getElementById("locationAnimation").style.display = 'block';
    document.getElementsByClassName("searchBox")[0].style.opacity = 0.3;
    document.getElementById("searchTextField").disabled = true;

    document.getElementsByClassName("waveAnimation")[0].style.opacity = 0.3;

    animation();
}

const loadDashboardStyle = () => {
    document.getElementById("locationAnimation").style.display = 'block';
    document.getElementById("topBar").style.opacity = 0.3;
    document.getElementById("mapid").style.opacity = 0.3;
    document.getElementById("searchTextField").disabled = true;

}

var input = document.getElementById("searchTextField");
        input.addEventListener("keyup", (event) => {
            const placeName = document.getElementById("searchTextField").value;
            if (event.keyCode === 13) {
                if (window.location.href=='http://localhost:9090/') {
                    loadIndexStyle()
                } else if (window.location.href=='http://localhost:9090/dashboard') {
                    loadDashboardStyle()
                }          

                getLive(placeName)
                event.preventDefault();
            }
        })

const getLive = (placeName, callback) => {
    const fetchingUrl = `http://localhost:9090/place?name=${placeName}`
    console.log(fetchingUrl)

    $.get(fetchingUrl, (res, err) => {


        console.log(res)
        
        // document.getElementsByClassName("live-data")[0].style.display = "flex";
        // document.getElementById("date").innerHTML = "נכון ל" + res["time"];
        // document.getElementById("report").innerHTML = res["live_report"];

        localStorage.setItem("place", JSON.stringify(res));

        if (window.location.href=='http://localhost:9090/') {
            window.location.href = `./dashboard`;
        } else if (window.location.href=='http://localhost:9090/dashboard') {
            const place = JSON.parse(localStorage.getItem("place"))

            setLastPlace(place)
            addMarker()

            document.getElementById("locationAnimation").style.display = 'none';
            document.getElementById("topBar").style.opacity = 1;
            document.getElementById("mapid").style.opacity = 1;
            document.getElementById("searchTextField").disabled = false;
            document.getElementById("searchTextField").value = '';
        }          

        
    })


}