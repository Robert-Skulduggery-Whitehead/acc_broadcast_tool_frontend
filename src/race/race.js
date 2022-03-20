import React from "react";
import CarComponent from "../carComponent";

export default class Race extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.entryListCars.length > 0) {
      this.props.entryListCars.sort(
        (a, b) =>
          a.carInfo.carUpdate.splinePosition >
          b.carInfo.carUpdate.splinePosition
      );
      return (
        <div>
          <div className="carList">
            <div className="carComponentHeader">
              <span>P</span>
              <span>Car</span>
              <span>Drv</span>
              <span>Driver</span>
              <span>Lap</span>
              <span>Location</span>
              <span>Delta</span>
              <span>Current</span>
              <span>Last</span>
              <span>Best</span>
            </div>
            {this.props.entryListCars.map((carInfo, i, array) => {
              return (
                <CarComponent
                  carInfo={carInfo}
                  key={i}
                  socket={this.props.socket}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
