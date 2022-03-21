import React from "react";

export default class CarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  changeFocus() {
    this.props.socket.emit("setCar", (this.props.car.carIndex))
  }

  render() {
    return (
      <div className="carComponent" onClick={this.changeFocus.bind(this)}>
        <span className="carPosition">{this.props.car.carUpdate.position}</span>
        <span className="carNumber">{this.props.car.carInfo.RaceNumber}</span>
        <span className="carPositionDriverName">
          {
            this.props.car.carInfo.drivers[this.props.car.carUpdate.driverIndex]
              .FirstName[0]
          }{". "}
          {
            this.props.car.carInfo.drivers[this.props.car.carUpdate.driverIndex]
              .LastName
          }
        </span>
        <span className="carPositionLaps">{this.props.car.carUpdate.laps}</span>
        <span className="carPositionLocation">{carLocation(this.props.car.carUpdate.carLocationNo)}</span>
        <span className="carPositionDelta">
          {this.props.car.carUpdate.delta}
        </span>
        <span className="carPositionCurrentLap">
          {msToTime(this.props.car.carUpdate.currentLap.LaptimeMS)}
        </span>
        <span className="carPositionLastLap">
          {msToTime(this.props.car.carUpdate.lastLap.LaptimeMS)}
        </span>
        <span className="carPositionBestLap">
          {msToTime(this.props.car.carUpdate.bestSessionLap.LaptimeMS)}
        </span>
      </div>
    );
  }
}

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(mins) + ":" + pad(secs) + "." + pad(ms, 3);
}

function carLocation(location) {
  switch (location) {
    case 0:
      return "NONE";
    case 1:
      return "Track";
    case 2:
      return "Pitlane";
    case 3:
      return "PitEntry";
    case 4:
      return "PitExit";
    default:
      return "PIT";
  }
}

/*
props:car {
  carIndex: x;
  carInfo: {
    CarModelType
    TeamName
    RaceNumber
    CupCategory
    CurrentDriverIndex
    Nationality
    drivers: [
      {
        FirstName
        LastName
        ShortName
        Category
        Nationality
      }
    ]
  }
  carUpdate: {
    carIndex
    driverIndex
    driverCount
    gear
    worldPosX
    worldPosY
    yaw
    carLocationNo
    kmh
    position
    cupPosition
    trackPosition
    splinePosition
    laps
    delta
    bestSessionLap
    lastLap
    currentLap
  }
}
*/
