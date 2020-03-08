function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function removeObj(arr, obj) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i].name == obj.name) {
            arr.splice(i, i+1)
            break;
        }
    }
    return arr
}

const insertPlaceObjToLS = (placeObj) => {
    let placesObj = JSON.parse(localStorage.getItem('placesObj'))
    if (placeObj == null) {
        console.log('Null object')
        return placesObj
    }
    let placeName = placeObj.name
    // console.log(placesObj)

    if (getPlaceObjFromLS(placeName)) {
        console.log(`The place ${placeName} is already at local storage, so he was updated!`)
        placesObj = removeObj(placesObj, placeObj)
        // return placesObj
    }

    
    placesObj.push(placeObj)
    localStorage.setItem("placesObj", JSON.stringify(placesObj));

    return placesObj
}

const getPlaceObjFromLS = (placeName) => {
    // console.log(localStorage.getItem('placesObj'))

    return JSON.parse(localStorage.getItem('placesObj')).find(place => place.name == placeName)
}