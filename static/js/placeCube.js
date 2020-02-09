const createPlaceCube = (placeName) => {
    // place=JSON.parse(localStorage.getItem("place"))

    console.log(placeName)

    const place = getPlaceObjFromLS(placeName).data

    const imgDiv = `<div id='google-icon-div'>\
                        <img src="${place['google_api_info'][0]['icon']}" id="google-icon" />\
                    </div>`
    const placeNameDiv = `<div id="place-name">\
                            <p>${place['google_name']}</p>\
                        </div>`

    console.log(place['outside_view_links'])

    let placeTypeDiv = ``
    if (place['type']) {
        placeTypeDiv = `<div id="place-type">\
                                <p>${place['type']}</p>\
                            </div>`
    } 
    
    const liveHeight = parseFloat(place['live_population']['live_height'])
    const usualHeight = parseFloat(place['live_population']['usual_height'])

    let placeChangeDiv = `<div id="place-change">\
                                <p>אין שידור חי</p>\
                            </div>`

    let liveReport = ''
    if (place['live_population']['live_height']!=null){
        console.log(place['live_population'])
        liveReport = place['live_population']['live_report']

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
    } else {
        liveReport = 'אין שידור חי'
    }

    let addedProps = {}
    for (prop in place) {
        if (place[prop] == null) {continue;}
        if (prop=='address') {
            addedProps['כתובת'] = place['address']
        } if (prop=='description') {
            addedProps['תיאור'] = place['description'].replace('תיאור','').replace('ויקיפדיה','')
        } if (prop=='usual_time_spent') {
            addedProps['זמן בילוי ממוצע'] = place['usual_time_spent'].replace('אנשים בדרך כלל מבלים כאן ','').replace('במשך ','')
        } if (prop=='other') {
            for (o in place['other']) {
                addedProps[o] = place['other'][o]
            }
        }
    }

    let addedPropsSpans = ``
    for (prop in addedProps) {
        addedPropsSpans += `<div class="addedPropsDiv">\
                                <span class="propSpan">\
                                    <p>${prop}:</p>\
                                </span>\
                                <span class="propData">\
                                    <p>${addedProps[prop]}</p>\
                                </span>\
                                <span id="copyMessage" onclick="copyMessage(this)"><i class="far fa-copy"></i></span>\
                            </div>`
    }
    
    // location icon clickkkkkk
    const mainDiv = `<div class="place placeHover" onclick="clickPlaceDiv(this)" aria-label='${placeName}'>\
                        <div class="controlPlaceDiv">\
                            <i class="fas fa-times closePlace" onclick="closePlace(this)"></i>\
                            <i class="fas fa-window-minimize minimizePlace" onclick="minimizePlace(this)"></i>\
                        </div>\
                        ${imgDiv}\
                        <div class='properties'>\
                        ${placeNameDiv}\
                        ${placeTypeDiv}\
                        ${placeChangeDiv}\
                        <div class="addedText" style="direction: rtl ;">\
                        ${addedPropsSpans}\
                        </div>\
                        </div>\
                        <div class="placeButtons">
                        <i class="fas fa-calendar-day placeButton"></i>\
                        <a target="_blank" href="https://www.google.co.il/search?q=${place['name']}"> <i class="fab fa-google placeButton"></i></a>\
                        <a onclick="openImage(this)"><i class="fas fa-images placeButton">
                        </i><img id="image-placeholder" src="${place['google_images'][0]}"></a>\
                        <i class="fas fa-cloud-sun placeButton"></i>\
                        </div>\
                        <div class="chartDiv">\
                            <p style="color: white; font-size:13px; margin-top:20px">\
                            כרגע <b>${liveReport}</b></p>\
                            <p style="color: white; font-size:12px; font-style:italic; color: indianred">\
                            (${place['live_population']['time']})</p>\
                            <canvas id="myChart" width='180' height="150"></canvas>\
                        </div>\
                    </div>`
    
    return mainDiv
}

const addContent = (placeElement, callback) => {
    $(placeElement).removeClass('placeHover')

    $(placeElement).find('.controlPlaceDiv').css({'display':'block'})
    $(placeElement).find('#place-name').css({'margin-top':'15px'})
    $(placeElement).find('#place-type').css({'padding-bottom': '10px'})

    let titleHeight = ''
    console.log($(placeElement).find('#place-type').length)
    if ($(placeElement).find('#place-type').length) {
        titleHeight = $(placeElement).find('#place-type').height() + $(placeElement).find('#place-name').height()
        $(placeElement).find('.addedText').css({'display':'block', 'margin-top':`15px`})
        console.log(titleHeight)
    } else {
        titleHeight = $(placeElement).find('#place-name').height()
        $(placeElement).find('.addedText').css({'display':'block', 'margin-top':`38px`})
    }
    
    $(placeElement).find('.chartDiv').css({'display':'block'})
    // $(placeElement).find('#myChart').css({'display':'none'})

    const chartWidth = $(placeElement).find('.chartDiv').width()
    $(placeElement).find('.placeButtons').css({'display':'block', 'width':`${Math.max($(placeElement).find('.chartDiv').width()-50,120)}px`})
    // $(placeElement).find('.chartDiv').hide().delay(500).fadeIn()
    
    let addedHeight = $(placeElement).find('.addedText').height()

    if (addedHeight<170) {
        addedHeight = 170
    }

    // $(placeElement).find('.chartDiv').children('p').eq(1).css({'padding-bottom': `${addedHeight-150}px`})
    $(placeElement).find('.chartDiv').children('p').eq(1).css({'padding-bottom': `20px`})

    $(placeElement).find('.properties').toggleClass('propertiess');

    $(placeElement).find('#place-change').css({'margin-top':'0'})

    $(placeElement).find('#place-change').appendTo($(placeElement).find('#google-icon-div'))

    

    callback()
    
}

const removeContent = (placeElement) => {
    $(placeElement).addClass('placeHover')
    $(placeElement).find('.controlPlaceDiv').css({'display':'none'})
    $(placeElement).find('#place-name').css({'margin-top':'0'})
    $(placeElement).find('#place-type').css({'margin-bottom':'0', 'padding-bottom':'0', 'border-bottom':'0'})

    $(placeElement).find('.chartDiv').css({'display':'none'})
    $(placeElement).find('.addedText').css({'display':'none'})
    $(placeElement).find('.properties').removeClass('propertiess');

    $(placeElement).find('.properties').append($(placeElement).find('#place-change'))
    $(placeElement).find('#place-change').css({'margin-top':'10px'})
    
    
    $(placeElement).find('.placeButtons').css({'display':'none',})
    
}


const clickPlaceDiv = (placeDiv) => {

    if ($(placeDiv).width() > 200) {
        return null
    }

    const places = $('.places')
    const placesFirstChild = places.children().first()
    

    if ($(placeDiv).is(':first-child')) {
        $('.places').animate({
            scrollTop: 0},
            'slow');
        // $(placeDiv).prependTo(places).fadeIn()
    } else {
        $('.places').animate({
            scrollTop: $(placeDiv).offset().top},
            'slow');
        // removeContent(placesFirstChild)
        // $(placesFirstChild).removeClass('placi', 500)
        // $(placeDiv).hide().prependTo(places).fadeIn()
    }

    const placeAriaLabel = ($(placeDiv).attr("aria-label"))
    console.log(getPlaceObjFromLS(placeAriaLabel))
    const placeData = getPlaceObjFromLS(placeAriaLabel).data

    
    $(placeDiv).addClass('placi', () => {
        $(placeDiv).off('click')
        
        addContent(placeDiv, () => {
            
            // $(placeElement).hide().show()
            if (placeData['live_population']['live_height'] != null) {
                // divLeftHeight = $(placeElement).find('#google-icon-div').outerHeight() + $(placeElement).find('.placeButtons').outerHeight() + $(placeElement).find('.chartDiv').outerHeight()
                // divRightHeight = $(placeElement).find('#google-icon-div').height() + $(placeElement).find('.properties').height()
                // // $(placeDiv).find($('#myChart').hide())
                
                // $(placeElement).css({'height':`${Math.max(divLeftHeight,divRightHeight)}`})
                // $(placeDiv).find('.chartDiv').hide()

                // $(placeDiv).find('.chartDiv').hide()
                // $(placeDiv).find('.placeButtons').hide()
                // setTimeout(function () {
                //     $(placeDiv).find('.placeButtons').fadeIn()
                //     $(placeDiv).find('#myChart').css({'opacity':'0'})
                //     $(placeDiv).find('.chartDiv').fadeIn()
                //     // $(placeDiv).find($('.chartDiv').show())
                // }, 307);
                
                // setTimeout(function () {
                //     currentChart = makeChart(placeData, $(placeDiv));
                //     // $(placeDiv).find($('#myChart').show())
                // }, 500);





                $(placeDiv).find('.chartDiv').css({'opacity':'0', 'display':'none'})
                $(placeDiv).find('.placeButtons').hide()
                setTimeout(function () {
                    $(placeDiv).find('.placeButtons').fadeIn()
                    $(placeDiv).find('.chartDiv').css({'opacity':'0'})
                    $(placeDiv).slideDown(() => {
                        $(placeDiv).find('.chartDiv').slideDown(function() {
                            $(this).animate({'opacity':'1'})
                        })
                    })
                    
                    // $(placeDiv).find($('.chartDiv').show())
                }, 270);
                
                setTimeout(function () {
                    currentChart = makeChart(placeData, $(placeDiv));
                    // $(placeDiv).find($('#myChart').show())
                }, 500);
                // $(placeDiv).addClass('xx')
                // currentChart = makeChart(placeData, $(placeDiv));

            } else {
                $(placeDiv).find('#myChart').css({'display':'none'})
                $(placeDiv).find('.chartDiv').hide()
                $(placeDiv).find('.placeButtons').hide()
                setTimeout(function () {
                    $(placeDiv).find('.placeButtons').fadeIn()
                    
                    $(placeDiv).find('.chartDiv').fadeIn()
                    // $(placeDiv).find($('.chartDiv').show())
                }, 310);
                $(placeDiv).find('.chartDiv').css({'margin-left':'5%'})
            }
            
        })
        
        
    }); 
    

    // places.scrollTop(0);

    // if ($(placeDiv).hasClass('placi')) {
    //     removeContent(placeDiv)
    // } else {
        
    // }     
}

const copyMessage = (copyElement) => {
    var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(copyElement).parent('.addedPropsDiv').find('.propData').find('p').text()).select();
  document.execCommand("copy");
  $temp.remove();
}

const closePlace = (minimizeIcon) => {
    placeDiv = $(minimizeIcon).closest('.place')
    // $(placeDiv).hide(() => {
        // $(placeDiv).fadeOut(300, function(){ $(this).remove();});
    $(placeDiv).animate({opacity: 0}, () => {
        $(".places").hide()
        $(placeDiv).remove()
        $(".places").fadeIn()

    });
        // $(placeDiv).show()
    // })
}

const minimizePlace = (minimizeIcon) => {
    placeDiv = $(minimizeIcon).closest('.place')
    // $(placeDiv).hide(() => {
    removeContent(placeDiv)
    $(placeDiv).removeClass('placi')
        // $(placeDiv).show()
    // })
}

const openImage = (imageIcon) => {
    // $(imageIcon).find('#image-placeholder').css({'display':'block', 'top':`${$('#google-icon-div').height()}px`}).appendTo('.placeImage')
    $('.placeImage').find('#image-placeholder').remove()
    $(imageIcon).find('#image-placeholder').clone().css({'display':'block'}).appendTo('.placeImage')
    $('.placeImage').hide().fadeIn()
}

// <canvas id="myChart" width="100" height="100"></canvas>
// $(".places").html($(".places").html() + kaki)