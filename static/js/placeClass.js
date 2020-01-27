class Place {
    constructor(placeName, data) {    
        this.name = placeName;
        this.data = data;
        this.type = this.data['type']
        if (this.data['livePopulation']) {
            this.livePopulation = this.data['live_population']
            this.timeSet = this.livePopulation['time']
        }
        
    }

    get change() {
        liveHeight = this.livePopulation['live_height']
        usualHeight = this.livePopulation['usual_height']
        
        return ((liveHeight-usualHeight)/usualHeight)
    }
  }