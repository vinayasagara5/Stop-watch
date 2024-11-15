import React, { Component } from 'react';
import './Stopwatch.css';

const Separator = () => <span className="Stopwatch-separator">:</span>;

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: null,
      totalSeconds: 0,
    };
  }

  incrementCount = () => {
    this.setState({ totalSeconds: this.state.totalSeconds + 1 });
  };

  getHours = () => Math.floor(this.state.totalSeconds / 3600);
  getMinutes = () => Math.floor(this.state.totalSeconds / 60) % 60;
  getSeconds = () => this.state.totalSeconds % 60;

  startCounter = () => {
    if (!this.state.tick) {
      this.setState({
        tick: setInterval(this.incrementCount, 1000),
      });
    }
  };

  stopCounter = () => {
    clearInterval(this.state.tick);
    this.setState({ tick: null });
  };

  resetCounter = () => {
    clearInterval(this.state.tick);
    this.setState({ totalSeconds: 0, tick: null });
  };

  leadingZero = (num) => (num < 10 ? '0' + num : num);

  render() {
    const { totalSeconds, tick } = this.state;
    const started = totalSeconds > 0;

    const renderButtons = () => {
      if (!tick && !started) {
        return (
          <button className="Stopwatch-button start" onClick={this.startCounter}>
            Start
          </button>
        );
      }
      if (!tick && started) {
        return (
          <>
            <button className="Stopwatch-button resume" onClick={this.startCounter}>
              Resume
            </button>
            <button className="Stopwatch-button reset" onClick={this.resetCounter}>
              Reset
            </button>
          </>
        );
      }
      return (
        <>
          <button className="Stopwatch-button stop" onClick={this.stopCounter}>
            Stop
          </button>
          <button className="Stopwatch-button reset" onClick={this.resetCounter}>
            Reset
          </button>
        </>
      );
    };

    return (
      <div className="Stopwatch-container">
        <div className="Stopwatch-display">
          <span className="Stopwatch-number">{this.leadingZero(this.getHours())}</span>
          <Separator />
          <span className="Stopwatch-number">{this.leadingZero(this.getMinutes())}</span>
          <Separator />
          <span className="Stopwatch-number">{this.leadingZero(this.getSeconds())}</span>
        </div>
        <div className="Stopwatch-buttons">{renderButtons()}</div>
      </div>
    );
  }
}

export default Stopwatch;
