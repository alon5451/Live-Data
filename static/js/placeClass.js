class Place {
    constructor(placeJson) {    
        this.name = placeJson['google_name'];
        this.type = placeJson['type']
        this.livePopulation = placeJson['live_population']
    }

    get change() {
        liveHeight = this.livePopulation['live_height']
        usualHeight = this.livePopulation['usual_height']
        
        return ((liveHeight-usualHeight)/usualHeight)
    }
  }