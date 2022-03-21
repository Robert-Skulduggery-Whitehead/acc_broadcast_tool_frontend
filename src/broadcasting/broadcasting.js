import React from "react";
import CarComponent from "../carComponent";
import "./broadcasting.css"

export default class Broadcasting extends React.Component {
  constructor(props) {
    /*props 
    connected 
    entryList 
    entryListCars 
    realTimeCarUpdate 
    trackData 
    broadcastingEvent
    socket
    */
    super(props);
    this.state = {
      splits: [],
      cars: "<div></div>",
    };
  }

  render() {
      this.props.entryListCars.sort(
        (a, b) => a.carUpdate.position > b.carUpdate.position
      );
      this.state.cars = this.props.entryListCars.map((carInfo, i, array) => {
        if (i + 1 !== array.length) {
          if (carInfo.carUpdate.position === array[i + 1].carUpdate.position) {
            this.props.socket.emit("requestUpdate");
          }
        }
        return (
          <CarComponent car={carInfo} key={i} socket={this.props.socket} />
        );
      });
    return (
      <div className="broadcastingContainer">
        <div className="carList">
          <div className="carComponentHeader">
            <span>P</span>
            <span>Car</span>
            <span>Driver</span>
            <span>Lap</span>
            <span>LOC</span>
            <span>Delta</span>
            <span>Current</span>
            <span>Last</span>
            <span>Best</span>
          </div>
          {this.state.cars}
        </div>
        <div className="sessionInfo"></div>
        <div className="cameraList"></div>
        <div className="highlightList"></div>
      </div>
    );
  }
}
