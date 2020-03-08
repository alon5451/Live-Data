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
        const typeClick = $('.dropdown').find('input').val()
        // console.log(typeClick)
        if (typeClick=='general') {
            window.location.href = `./dashboard?query=${placeName}`;
            // getLiveOfList(placeName)
        } else if (typeClick=='point') {
            getLive(placeName, () => {
                $(".places").html(createPlaceCube() + $(".places").html())
            })
        }
  
        // getLive(placeName, () => {
        //     $(".places").html(createPlaceCube() + $(".places").html())
        // })
        
        event.preventDefault();
    }
})

const getLiveOfList = (query, callback) => {
    const fetchingUrli = `http://localhost:9090/department?query=${query}`

    $.get(fetchingUrli, (resi, err) => {
        let lastMainDiv = ''

        for (placeNameRes of JSON.parse(resi)) {

            const fetchingUrl = `./place?name=${placeNameRes}`

            $.get(fetchingUrl, (res, err) => {        

                
            if (window.location.href.replace(window.location.search,"")=='http://localhost:9090/dashboard') {
                    insertPlaceObjToLS(new Place(placeNameRes, data=res))
                    lastMainDiv += (createPlaceCube(placeNameRes))
                    // console.log(lastMainDiv)
                    // const place = JSON.parse(localStorage.getItem("place"))
                    addMarker(placeNameRes, () => {
                        console.log(placeNameRes)
                        if (placeNameRes==JSON.parse(resi)[JSON.parse(resi).length-1]) {
                            $('#mapid').css({'animation':'example 1s 0 alternate'});
                            $('.places').css({'animation':'example 1s 0 alternate'});
                            document.getElementById("searchTextField").disabled = false;
                            $('#searchTextField').val('');
                            console.log('before callback')
                            callback(lastMainDiv)
                        }
                        clickPlaceDiv()
                    })
                    
                    

                }          
                
                
            })
            // console.log(placeNameRes, JSON.parse(resi)[JSON.parse(resi).length-1])
            
                    // $(".places").html(createPlaceCube(placeNameRes) + $(".places").html())
                    // console.log(placeNameRes)
        }
        
        // $(".places").html(lastMainDiv)
    })
        
        }

const getLive = (placeName, callback) => {
    const fetchingUrl = `./place?name=${placeName}`

    $.get(fetchingUrl, (res, err) => {        
        // console.log(res)
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
            document.getElementById("searchTextField").disabled = false;
            $('#searchTextField').val('');
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



