var input = document.getElementById("searchTextField");
input.addEventListener("keyup", (event) => {
    const placeName = document.getElementById("searchTextField").value;
    if (event.keyCode === 13) {
        if (window.location.href=='http://localhost:9090/') {
            loadIndexStyle()
        } else if (window.location.href=='http://localhost:9090/dashboard') {
            loadDashboardStyle()
        }          

        getLive(placeName, () => {
            $(".places").html(createPlaceCube() + $(".places").html())
        })

        event.preventDefault();
    }
})

const getLive = (placeName, callback) => {
    const fetchingUrl = `http://localhost:9090/place?name=${placeName}`

    $.get(fetchingUrl, (res, err) => {        

        localStorage.setItem("place", JSON.stringify(res));
        // console.log(new Place(res))
        if (window.location.href=='http://localhost:9090/') {
            window.location.href = `./dashboard`;
        } else if (window.location.href=='http://localhost:9090/dashboard') {
            const place = JSON.parse(localStorage.getItem("place"))

            setLastPlace(place)
            addMarker(() => {
                $(".places").html(createPlaceCube() + $(".places").html())
                clickPlaceDiv()
            })
            

            document.getElementById("locationAnimation").style.display = 'none';
            document.getElementById("topBar").style.opacity = 1;
            document.getElementById("mapid").style.opacity = 1;
            document.getElementById("searchTextField").disabled = false;
            document.getElementById("searchTextField").value = '';
        }          
        
        
    })


}


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
    document.getElementById("mapid").style.opacity = 0.05;
    document.getElementById("searchTextField").disabled = true;
}



