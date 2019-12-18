// const getLive = (placeName) => {
//     const fetchingUrl = `http://localhost:9090/?name=${placeName}`
//     console.log(fetchingUrl)
// }

var input = document.getElementById("searchTextField");
        input.addEventListener("keyup", (event) => {
            const placeName = document.getElementById("searchTextField").value;
            if (event.keyCode === 13) {
                getLive(placeName)
                event.preventDefault();
            }
        })

const getLive = (placeName, callback) => {
    const fetchingUrl = `http://localhost:9090/?name=${placeName}`
    console.log(fetchingUrl)

    $.get(fetchingUrl, (res, err) => {
        console.log(res["live_report"])
        console.log(res["time"])
        document.getElementsByClassName("live-data")[0].style.display = "flex";
        document.getElementById("date").innerHTML = "נכון ל" + res["time"];
        document.getElementById("report").innerHTML = res["live_report"];
        
    })


}