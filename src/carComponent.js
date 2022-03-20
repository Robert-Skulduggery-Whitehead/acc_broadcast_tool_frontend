import React from "react";

export default class CarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
    };

    let temp = "";
    switch (this.props.car.carUpdate.trackPosition) {
      case 0:
        temp = "NONE";
        break;
      case 1:
        temp = "Track";
        break;
      case 2:
        temp = "Pitlane";
        break;
      case 3:
        temp = "PitEntry";
        break;
      case 4:
        temp = "PitExit";
        break;
    }
    this.setState({
      location: temp,
    });
  }

  render() {
    return (
      <div className="carComponent">
        <span className="carPosition">{this.props.car.carUpdate.position}</span>
        <span className="carNumber">{this.props.car.carInfo.RaceNumber}</span>
        <span className="carPositionDriverName">
          {
            this.props.car.carInfo.drivers[this.props.car.carUpdate.driverIndex]
              .FirstName
          }{" "}
          {
            this.props.car.carInfo.drivers[this.props.car.carUpdate.driverIndex]
              .LastName
          }
        </span>
        <span className="carPositionLaps">{this.props.car.carUpdate.laps}</span>
        <span className="carPositionLocation">{this.state.location}</span>
        <span className="carPositionDelta">
          {this.props.car.carUpdate.delta}
        </span>
        <span className="carPositionCurrentLap">
          {this.props.car.carUpdate.currentLap.LapTimeMS}
        </span>
        <span className="carPositionLastLap">
          {this.props.car.carUpdate.lastLap.LapTimeMS}
        </span>
        <span className="carPositionBestLap">
          {this.props.car.carUpdate.bestLap}
        </span>
      </div>
    );
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
