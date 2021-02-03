import React, { Component } from "react";
import history from "../history";
import axios from "axios";
export default class Timer extends Component {
  state = { count: 5, quiz: [], countDownDate: [] };
  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:8000/api/quiz/quizzes/${this.props.slug}`,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => this.setState({ quiz: res.data.quiz.endtime }))
      .then(() => {
        var now = new Date().getTime();
        var end = new Date(`${this.state.quiz}`).getTime();
        var left = end - now;
        this.setState({ count: left });
      });
    setInterval(() => {
      this.setState((prevState) => ({ count: prevState.count - 1000 }));
    }, "1000");
  }
  render() {
    if (this.state.count === 0) {
      history.push("/submit");
    }
    var hour = Math.floor(this.state.count / 3600000);
    var min = Math.floor((this.state.count - hour * 3600000) / 60000);
    var chec = min / 10;
    var minute = chec <= 1 ? `0${min}` : min;
    var sec = Math.floor((this.state.count - (hour * 3600000 + min * 60000)) / 1000);
    return this.props.slug != undefined ? (
      <div className="f-29">
        Time Left : 0{hour}:{minute}:{sec}
      </div>
    ) : (
      ""
    );
  }
}
