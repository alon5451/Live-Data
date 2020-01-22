const createPlaceCube = (place=JSON.parse(localStorage.getItem("place"))) => {
    const imgDiv = `<div id='google-icon-div'>\
                        <img src="${place['google_api_info'][0]['icon']}" id="google-icon">\
                    </div>`
    const placeNameDiv = `<div id="place-name">\
                            <p>${place['google_name']}</p>\
                        </div>`

    const placeTypeDiv = `<div id="place-type">\
                             <p>${place['type']}</p>\
                          </div>`
    
    const liveHeight = parseFloat(place['live_population']['live_height'])
    const usualHeight = parseFloat(place['live_population']['usual_height'])

    let placeChangeDiv = `<div id="place-change">\
                                <p>אין שידור חי</p>\
                            </div>`

    if (place['live_population']['live_height']!=null){
        console.log(place['live_population'])

        if (liveHeight > usualHeight) {
            changePrecent = (((liveHeight-usualHeight)/usualHeight)*100)
            changePrecent = Math.round(changePrecent*100) / 100
            arrow = '<i class="fas fa-arrow-up" style="color: red; animation: example 1s infinite alternate; font-size:25px;"></i>'
        } else {
            changePrecent = (((liveHeight-usualHeight)/usualHeight)*100)
            changePrecent = Math.round(changePrecent*100) / 100
            arrow = '<i class="fas fa-arrow-down" style="color: green; animation: example 1s infinite alternate; font-size:25px;"></i>'
        }
        placeChangeDiv = `<div id="place-change">\
                                    <p>${arrow}  ${changePrecent}%  ${arrow}</p>\
                                </div>`
    } 

    
    
    const mainDiv = `<div class="place">\
                        ${imgDiv}\
                        ${placeNameDiv}\
                        ${placeTypeDiv}\
                        ${placeChangeDiv}\
                    </div>`
    
    return mainDiv
}

const addContent = (placeElement, place=JSON.parse(localStorage.getItem("place"))) => {
    // $(placeElement).find('#google-icon-div').add($(placeElement).find('#place-change').html())
    $(placeElement).find('#google-icon-div').html($(placeElement).find('#google-icon-div').html() + $(placeElement).find('#place-change').html())

    $(placeElement).find('#place-name').css({'float':'right', 'padding':'15px'})
    $(placeElement).find('#place-type').css({'float':'right'})

    $(placeElement).find('#google-icon').css({'margin-bottom':'5px'})
    $(placeElement).find('#place-change').css({'display':'none'})

    const googleStreetView = `<img src="${place['google_images'][0]}" id="google-street-view">`
    
    $(placeElement).html($(placeElement).html() + googleStreetView)
}

const clickPlaceDiv = () => {
    $('.place').click(function() {
        const places = $('.places')
        const placesFirstChild = places.children().first()
        

        if ($(this).is(':first-child')) {
            $(this).prependTo(places).fadeIn()
            // places.prepend($(this)).fadeIn();
        } else {
            placesFirstChild.removeClass('placi', 500)
                // places.prepend($(this), 500);
                // $(this).hide();
                $(this).hide().prependTo(places).fadeIn()
                // $(this).slideToggle();

        }


        $(this).toggleClass('placi', 500); 

        places.scrollTop(0);

        addContent(this)
        
    })
}

// <img src="${place['google_images'][0]}" id="populationImg">\


// <canvas id="myChart" width="100" height="100"></canvas>
// $(".places").html($(".places").html() + kaki)