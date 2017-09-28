// import {observer, Provider} from 'mobx';
// import  {observable, computed, action, transaction, useStrict, extendObservable, asMap, when, autorun} from 'mobx-react';



// class PortfolioList {
//   id = Math.random();
//   @observable unit = "C";
//   @observable temperatureCelsius = 25;
//   @observable location = "Amsterdam, NL";
//   @observable loading = true;

//   constructor(location) {
//     this.location = location
//     this.fetch()
//   }

//   @action fetch() {
//      window.fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${APPID}&q=${this.location}`)
//     .then(res => res.json()
//     .then(action(json => {
//       this.temperatureCelsius = json.main.temp -273.15
//       this.loading = false
//     })))
//   }

//   @computed get temperatureKelvin() {
//     console.log("calculating Kelvin")
//     return (this.temperatureCelsius * (9/5) + 32);
//   }
   
//   @computed get temperatureFahrenheit() {
//     console.log("calculating Fahrenheit")
//     return this.temperatureCelsius + 273.15
//   }
   
//   @computed get temperature() {
//     console.log("calculating temperature")
//     switch(this.unit) {
//       case "K": return this.temperatureKelvin + "ºK"
//       case "F": return this.temperatureFahrenheit + "ºF"
//       case "C": return this.temperatureCelsius + "ºC"
//     }
//   }

//   @action setUnit(newUnit) {
//     this.unit = newUnit;
//   }

//   @action setCelsius(degrees) {
//     this.temperatureCelsius = degrees;
//   }
   
//   @action("update temperature and unit")
//   setTemperatureAndUnit(degrees, unit) {
//     this.setCelsius(degrees);
//     this.setUnit(unit);
//   }

//   @action inc() {
//     this.setCelsius(this.temperatureCelsius + 1)
//   }
// }