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

    socket.on("realTimeCarUpdate", (entryListCars) => {
      this.setState({
        entryListCars: entryListCars
      })
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
