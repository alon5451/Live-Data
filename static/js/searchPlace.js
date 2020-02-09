var input = document.getElementById("searchTextField");
input.addEventListener("keyup", (event) => {
    const placeName = document.getElementById("searchTextField").value;
    if (event.keyCode === 13) {
        if (localStorage.getItem('placesObj')==null) {
            localStorage.setItem("placesObj", JSON.stringify([]));
        }
        if (window.location.href=='http://localhost:9090/') {
            localStorage.setItem("placesObj", JSON.stringify([]));
            loadIndexStyle()
        } else if (window.location.href.replace(window.location.search,"")=='http://localhost:9090/dashboard') {
            loadDashboardStyle()
        }          
        
        getLive(placeName, () => {
            $(".places").html(createPlaceCube() + $(".places").html())
        })
        
        event.preventDefault();
    }
})

const getLiveOfList = (placeType, placeCity) => {
    const fetchingUrl = `http://localhost:9090/department?type=${placeType}&city=${placeCity}`

    $.get(fetchingUrl, (res, err) => {
        for (placeNameRes of JSON.parse(res)) {
            getLive(placeNameRes)
            // console.log(placeNameRes)
        }
        
    })
}

const getLive = (placeName, callback) => {
    const fetchingUrl = `http://localhost:9090/place?name=${placeName}`

    $.get(fetchingUrl, (res, err) => {        
        console.log(res)
        if (res['error']) {
            try {
                $('#mapid').css({'animation':'example 1s 0 alternate'});
                $('.places').css({'animation':'example 1s 0 alternate'});
                document.getElementById("searchTextField").disabled = false;
                document.getElementByClassName("searchTextField").disabled = false;
            } catch {
                document.getElementById("populationImg").style.display = 'block';
                document.getElementById("locationAnimation").style.display = 'none';
                document.getElementsByClassName("searchBox")[0].style.opacity = 1;
                document.getElementById("searchTextField").disabled = false;
                document.getElementsByClassName("waveAnimation")[0].style.opacity = 1;
            }
            if (res['error']=='couldn\'t set knowledge panel') {
                alert('המקום לא נמצא. אנא חפש מקום אחר, או שנה את הניסוח')
            }
            
            return null
        }
        
        // localStorage.setItem("place", JSON.stringify(res));
        // console.log(new Place(res))
        if (window.location.href=='http://localhost:9090/') {
            insertPlaceObjToLS(new Place(placeName, data=res))
            
            window.location.href = `./dashboard?search=${res['name']}`;
        } else if (window.location.href.replace(window.location.search,"")=='http://localhost:9090/dashboard') {
            insertPlaceObjToLS(new Place(placeName, data=res))
            
            // const place = JSON.parse(localStorage.getItem("place"))
            addMarker(placeName, () => {
                $(".places").html(createPlaceCube(placeName) + $(".places").html())
                // clickPlaceDiv()
            })
            
            
            $('#mapid').css({'animation':'example 1s 0 alternate'});
            $('.places').css({'animation':'example 1s 0 alternate'});
            // document.getElementById("locationAnimation").style.display = 'none';
            // document.getElementById("topBar").style.opacity = 1;
            // document.getElementById("mapid").style.opacity = 1;
            document.getElementById("searchTextField").disabled = false;
            document.getElementByClassName("searchTextField").disabled = false;
            // document.getElementById("searchTextField").value = '';
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
    // document.getElementById("locationAnimation").style.display = 'block';
    // document.getElementById("topBar").style.opacity = 0.3;
    // document.getElementById("mapid").style.opacity = 0.05;
    document.getElementById("searchTextField").disabled = true;
    $('#mapid').css({'animation':'example 1s infinite alternate'});
    $('.places').css({'animation':'example 1s infinite alternate'});
}



