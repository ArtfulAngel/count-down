import React, { Component } from 'react';
import './App.css';

import Circle from './component/circle';

class App extends Component {
  state = {
    minutes: 0,
    seconds: 10,
    strokeDashoffsetMinutes: 440,
    strokeDashoffsetSeconds: 0,
  };

  handlerStopTimer = () => {
    if (window.interval) clearInterval(window.interval);
  };

  onChangeMinutesValue = event => {
    this.handlerStopTimer();
    const minutes = parseInt(event.target.value);
    debugger;
    this.setState(prevState => ({
      minutes,
      strokeDashoffsetMinutes: minutes === 0 ? 440 : 0,
    }));
  };

  onChangeSecondsValue = event => {
    this.handlerStopTimer();
    const seconds = parseInt(event.target.value);
    this.setState(prevState => ({
      seconds,
      strokeDashoffsetSeconds: seconds === 0 ? 440 : 0,
    }));
  };

  handlerStartTimer = () => {
    const startMinutes = this.state.minutes;
    let startSeconds = this.state.seconds;

    this.handlerStopTimer();
    if (startMinutes !== 0 || startSeconds !== 0) {
      window.interval = setInterval(() => {
        if (this.state.minutes === 0 && this.state.seconds === 0) {
          this.handlerStopTimer();
          return;
        }

        if (this.state.seconds > 1) {
          this.setState(prevState => ({
            seconds: prevState.seconds - 1,
            strokeDashoffsetSeconds: prevState.strokeDashoffsetSeconds + 440 / startSeconds + 1,
          }));
        } else {
          if (this.state.minutes >= 1) {
            startSeconds = 60;
            this.setState(prevState => ({
              seconds: 60,
              strokeDashoffsetSeconds: 0,
              minutes: prevState.minutes - 1,
              strokeDashoffsetMinutes: prevState.strokeDashoffsetMinutes + 440 / startMinutes,
            }));
          } else {
            this.setState(prevState => ({
              seconds: 0,
              strokeDashoffsetSeconds: 440,
              minutes: 0,
              strokeDashoffsetMinutes: 440,
            }));
          }
        }
      }, 1000);
    }
  };

  render() {
    const { minutes, seconds, strokeDashoffsetMinutes, strokeDashoffsetSeconds } = this.state;
    return (
      <div className="app">
        <div className="app__content">
          <div className="app__row">
            <Circle count={minutes} label="минут" strokeDashoffset={strokeDashoffsetMinutes} />
            <Circle count={seconds} label="секунд" strokeDashoffset={strokeDashoffsetSeconds} />
          </div>
          <div className="app__row">
            <label>Введите значение таймера:</label>
          </div>
          <div className="app__row">
            <label>минуты:</label>
            <input
              id="minutes"
              className="app__input"
              value={minutes}
              onChange={this.onChangeMinutesValue}
            />
            <label>секунды:</label>
            <input
              id="seconds"
              className="app__input"
              value={seconds}
              onChange={this.onChangeSecondsValue}
            />
          </div>
          <div className="app__row">
            <button onClick={this.handlerStartTimer}>Старт</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
