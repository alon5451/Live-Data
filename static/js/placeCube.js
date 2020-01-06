const createPlaceCube = (place=JSON.parse(localStorage.getItem("place"))) => {
    const imgDiv = `<div>\
                        <img src="${place['google_api_info'][0]['icon']}" id="google-icon">\
                    </div>`
    const placeNameDiv = `<div id="place-name">\
                            <p>${place['google_name']}</p>\
                        </div>`

    const placeTypeDiv = `<div id="place-type">\
                             <p>${place['type']}</p>\
                          </div>`
    
    const liveHeight = place['live_population']['live_height']
    const usualHeight = place['live_population']['usual_height']

    let placeChangeDiv = `<div id="place-change">\
                                <p>אין שידור חי</p>\
                            </div>`

    if (place['live_population']['live_height']!=null){
        console.log(place['live_population'])
        if (liveHeight > usualHeight) {
            changePrecent = (((liveHeight-usualHeight)/usualHeight)*100).toString().slice(0, 5)
            arrow = '<i class="fas fa-arrow-up" style="color: red; animation: example 1s infinite alternate; font-size:25px;"></i>'
        } else {
            changePrecent = (usualHeight-liveHeight)/usualHeight
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
                        <canvas id="myChart" width="100" height="100"></canvas>\
                    </div>`
    
    return mainDiv
}

const clickPlaceDiv = () => {
    $('.place').click(function() {
    // var places = $('.place');
    // $(this).insertAfter(tests.last());
    
    var places = $('.places')
    
    // console.log($(this).is(':first-child'))
    if ($(this).is(':first-child')) {
        places.prepend($(this)).fadeIn();
    } else {
        places.prepend($(this)).fadeIn();
        $(this).hide();
        $(this).slideToggle();
    }
    
    // places.slideToggle();
    // $(this).toggleClass('margin-place', 500); 
    // $(this).toggleClass('place-props', 500); 

    $(this).toggleClass('placi', 500); 
    // $(this).removeClass('place')
})}



// $(".places").html($(".places").html() + kaki)