import React from 'react';
import {Button,  MenuItem} from '@material-ui/core'


import {Charts, 
  ChartContainer,
  ChartRow,
  EventChart,
  YAxis,
 } from 'react-timeseries-charts';
import {TimeSeries, TimeRange} from 'pondjs';


class Water extends React.Component {

  constructor(props) {
    super(props);
    this.measurementsFilter.bind(this)
    this.state = { 
      data: [],
      pageLoadDate: "",
      sensorNames: [],
      days: 7,
      button7: "success",
      button28: "primary",
      button365: "primary",
      focusName: "",
      timeRange: this.createTimeRange(7),
      chartXAxisFormat: "day", };
  }
  

componentDidMount() {
  this.setState({
    pageLoadDate: new Date()
  });
  this.getDataFromDB();
  setInterval(this.getDataFromDB(),5000);
}

getDataFromDB(){
  fetch("http://172.16.0.91:3300/api/getWater")
  .then(data => data.json())
  .then(res => {
    //console.log(res)
    this.setState({
      data: res.boolEntries
    }, () => this.measurementsFilter(this.state.data, this.state.days))
  })
 .catch((error) => {
    console.error(error)
});
}

measurementsFilter(arrObjects, days) {
  // copy
  var data = arrObjects.slice()

  // convert date
  for (var j=0; j<data.length; j++){
    data[j].lkuDate = new Date(data[j].lku)
  }
  // set n days to filter
  var d = new Date(new Date().setDate(new Date().getDate()-days))

  // filter time interval
  var filteredArray = data.filter(el=> {
    return el.lkuDate >= d
  })

  // get sensor attributes (this provides user selections)
  var names = this.sensorAttrList(filteredArray, "uniqueId")
  
  // filter temp data (hardcode for now)
  var tempArray = filteredArray.filter(el=> {
    return el;
  })
  
  // focus data on user selections
  var fName = this.focusSensorName(tempArray, this.state.focusName, names);
  var fAttr = this.focusSensorValue(tempArray, fName);
  var fValue = fAttr[0];
  var fDate = fAttr[1];

  // create timeseries
  var timeSeries = this.convertFocusDataToTimeseries(tempArray, fName);
  console.log("timeSeries");
  console.log(timeSeries);
  // save state
  this.setState({
    sensorNames: names,
    focusName: fName,
    focusValue: fValue,
    focusDate: fDate,
    temperature: tempArray,
    timeSeries: timeSeries,
    days: days
  })
}

createTimeRange(days) {
  var dateNow = new Date().getTime()
  var datePrev = new Date(new Date().setDate(new Date().getDate()-days)).getTime()
  return new TimeRange([datePrev, dateNow])
}
convertFocusDataToTimeseries(focusData, sensorName) {
  // create dictionary
  var data = {
    name: sensorName,
    columns: ["time", "val"],
    points: []
  }
  // filter tempArray by fName
  var focusArray = focusData.filter(el=> {
    return el.uniqueId === sensorName
  })
    
  // loop through data and add to points in the dictionary above
  for (var i=0; i<focusArray.length; i++){
    var date = focusArray[i].lku
    var dataPoint = [date, focusArray[i].status]
    data["points"].push(dataPoint)
  }
  
  // return
  return new TimeSeries(data)
}
sensorAttrList(fArray, key) {
  var sensorAttributes = []
  for (var i=0; i<fArray.length; i++){
    if (sensorAttributes.includes(fArray[i][key])){
      continue
    } else {
      sensorAttributes.push(fArray[i][key])
    }
  }
  return sensorAttributes
}


focusSensorValue(fArray, sensorName) {
  // filter data by sensor name
  // then, take the most recent record (last record)
  var fValue = fArray.filter(el=> {
    return el.uniqueId === sensorName
  })
  
  var res = []
  var dateNow = new Date()
  
  // treat undefined variable (occurs when filter returns no data)
  if (fValue.slice(-1)[0] == null) {
    res.push("No data")
    res.push("")
  } else {
    for(let i=0; i <= fValue.length; i++){
    res.push(fValue.slice(-1)[0]["status"])
    var hours = Math.floor(Math.abs(dateNow - fValue.slice(-1)[0]["lku"])/36e5)
    var mins = Math.floor((Math.abs(dateNow - fValue.slice(-1)[0]["lku"])/(60*1000))%60)
    res.push(hours + " hours " + mins + " mins")
    }
  }
  return res
}


focusSensorName(fArray, sensorName, namesList) {
  // name of sensor with most recent record
  //console.log("focusSensorName");
  console.log(namesList)
  var startName = fArray.slice(-1)[0]["uniqueId"]
  // set sensor name to focus on
  var fName = (sensorName === "" & namesList.length >= 1)
     ? "surfaceGauge"
     : sensorName
  // treat undefined variable (occurs when filter returns no data)
  if (fName == null) {
    fName = "Select"
  }
  //console.log(namesList)
  return fName
}


sevenDayHandle(){
  this.measurementsFilter(this.state.data, 7)
  this.setState({
    button7: "success", //change color of button7 to green
    button28: "primary",
    button365: "primary",
    timeRange: this.createTimeRange(7),
    chartXAxisFormat: "day",
  })
}


twentyEightDayHandle(){
  this.measurementsFilter(this.state.data, 28)
  this.setState({
    button7: "primary",
    button28: "success", //change color of button28 to green
    button365: "primary",
    timeRange: this.createTimeRange(28),
    chartXAxisFormat: "month"
  })
}


oneYearHandle(){
  this.measurementsFilter(this.state.data, 365)
  this.setState({
    button7: "primary",
    button28: "primary",
    button365: "success", //change color of button365 to green
    timeRange: this.createTimeRange(365),
    chartXAxisFormat: "year",
  })
}

statusEventStyleCB(event, state) {
  console.log("event");
  console.log(event);
  console.log("state");
  console.log(state);
  const color = event.get("data") === "true" ? "#998ec3" : "#f1a340";
  switch (state) {
      case "normal":
          return {
              fill: color
          };
      case "hover":
          return {
              fill: color,
              opacity: 0.4
          };
      case "selected":
          return {
              fill: color
          };
  }
}
  render() {
    let button7col = this.state.button7
    let button28col = this.state.button28
    let button365col = this.state.button365
    let sn = this.state.sensorNames
    const buttonsInstance = (
      <div className="wrapper">
         <Button
            bsStyle={button7col}
            onClick={this.sevenDayHandle.bind(this)}>
            7 days
         </Button>
         <Button
            bsStyle={button28col}
            onClick={this.twentyEightDayHandle.bind(this)}>
            28 days
         </Button>
         <Button
            bsStyle={button365col}
            onClick={this.oneYearHandle.bind(this)}>
            1 year
         </Button>
      </div>
     )
 
     if (this.state.timeSeries){
      console.log(this.state.timeRange.toString())
      console.log(this.state.timeSeries.toString())
      console.log(this.state.timeSeries.size())
 
      var chart = (
        <div className="wrapper">
         <ChartContainer
               timeRange={this.state.timeRange}
               enablePanZoom={true}
               showGrid={false}>
           <ChartRow height="35">
               <Charts>
                <EventChart
                  series={this.state.timeSeries}
                  style={this.statusEventStyleCB}
                  label="new"
                 />     
               </Charts>
           </ChartRow>
         </ChartContainer>
        </div>
      )
     }

   return <div>
          <p> {String(this.state.pageLoadDate)} </p>
          {buttonsInstance}
          <div className="TempContainer">
            <h1 className="TempValue">{this.state.focusValue}</h1>
            <p>{this.state.focusDate}</p>
          </div>
            {chart}
          </div>
  }
}

export default Water;

