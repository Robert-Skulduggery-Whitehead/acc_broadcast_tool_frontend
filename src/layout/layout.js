import React from "react";
import Broadcasting from "../broadcasting/broadcasting";
import "./layout.css";
import io from "socket.io-client";
import { format, compareAsc, getTime } from "date-fns";
const socket = io("http://127.0.0.1:6767");

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      entryList: [],
      entryListCars: [],
      carUpdates: 0,
      realTimeUpdate: {},
      realTimeCarUpdates: [],
      trackData: {},
      broadcastingEvent: {},
      ip: "",
      socket: io(),
      carEntryCount: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ip: event.target.value });
  }

  handleSubmit(event) {
    socket.emit("connectionIP", this.state.ip);
    event.preventDefault();
    console.log("yeet");
  }

  componentDidMount() {
    socket.on("connected", () => {
      this.setState({
        connected: true,
      });
    });

    socket.on("disconnected", () => {
      console.log("test");
      this.setState({
        connected: false,
      });
    });

    socket.on("entryList", (data) => {
      this.setState({
        entryListCars: data.entryList,
        carEntryCount: data.carEntryCount,
      });
    });

    socket.on("carInfo", (carInfo) => {
      let index = this.state.entryListCars.findIndex(
        (x) => x.carIndex == carInfo.carIndex
      );
      let temp = this.state.entryListCars;
      temp[index].carInfo = carInfo;
      this.setState({ entryListCars: temp });
    });

    socket.on("realTimeUpdate", (realTimeUpdate) => {
      this.setState({
        realTimeUpdate: realTimeUpdate,
      });
    });

    socket.on("realTimeCarUpdate", (realTimeCarUpdate) => {
      let now = format(new Date(), "Pp");
      /*for (let i = 0; i < this.state.entryListCars.length; i++) {
        if (
          getTime(now) -
            getTime(this.state.entryListCars.carUpdate.lastUpdate) >
          5000
        ) {
          socket.emit("requestUpdate");
        }
      }*/
      let index = this.state.entryListCars.findIndex(
        (x) => x.carIndex == realTimeCarUpdate.carIndex
      );
      if (index === -1 && this.state.entryListCars.length !== 0) {
        socket.emit("requestUpdate");
        this.setState({
          entryListCars: [],
        });
      } else {
        if (this.state.entryListCars.length > 0) {
          let temp = this.state.entryListCars;
          temp[index].carUpdate = realTimeCarUpdate;
          this.setState({ entryListCars: temp });
        }
      }
      //should reset entry list if new cars join
      //how to reset when less cars than previous request
    });

    socket.on("trackData", (trackData) => {
      this.setState({ trackData: trackData });
    });

    socket.on("broadcastingEvent", (broadcastingEvent) => {
      this.setState({ broadcastingEvent: broadcastingEvent });
    });
  }

  componentWillUnmount() {
    socket.connect();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    if (this.state.connected !== true) {
      return (
        <div className="connectionContainer">
          <form onSubmit={this.handleSubmit}>
            <label>
              IP:
              <input
                type="text"
                value={this.state.ip}
                onChange={this.handleChange}
              ></input>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <Broadcasting {...this.state} socket={socket} />;
    }
  }
}
