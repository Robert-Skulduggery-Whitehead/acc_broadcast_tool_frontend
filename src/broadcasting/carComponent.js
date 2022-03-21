import React from "react";

export default class CarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <span className="carPosition">
          {this.props.carInfo.carUpdate.position}
        </span>
        <span className="carNumber">{this.props.carInfo.RaceNumber}</span>
        <span className="carPositionDriverName"></span>
        <span className="carPositionLaps"></span>
        <span className="carPositionLocation"></span>
        <span className="carPositionDelta"></span>
        <span className="carPositionCurrentLap"></span>
        <span className="carPositionLastLap"></span>
        <span className="carPositionBestLap"></span>
      </div>
    );
  }
}

/*
props.carInfo {
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
