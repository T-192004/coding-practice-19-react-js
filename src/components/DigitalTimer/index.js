// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInSeconds: 0, timeLimitInMinutes: 25}

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timeLimitInMinutes} = this.state
    if (!isTimerRunning) {
      this.intervalId = setInterval(() => {
        if (timeInSeconds !== 0) {
          this.setState(prevState => ({
            timeInSeconds: prevState.timeInSeconds - 1,
          }))
        } else if (timeInSeconds === 0) {
          this.setState(prevState => ({
            timeInSeconds: 60,
            timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
          }))
        }
      }, 1000)
    } else {
      this.clearInterval(this.intervalId)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  increaseByMinute = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  decreaseByMinute = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
    }))
  }

  resetTimer = () => {
    this.setState({timeInSeconds: 0, timeLimitInMinutes: 25})
  }

  render() {
    const {isTimerRunning, timeInSeconds, timeLimitInMinutes} = this.state
    const timerStatusIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerStatusAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const stringifiedMinutes =
      timeLimitInMinutes > 9 ? timeLimitInMinutes : `0${timeLimitInMinutes}`

    // if the value of the minutes is less than 9(single digit) then the 0 will be attached in front of it to form a double-digit

    const stringifiedSeconds =
      timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`
    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="card-container">
          <div className="digital-timer-container">
            <div className="digital-time">
              <h1 className="time">
                {stringifiedMinutes} : {stringifiedSeconds}
              </h1>
              <span className="timer-status">Running</span>
            </div>
          </div>
          <div className="timer-controller-container">
            <button
              className="timer-controller-btn"
              type="button"
              onClick={this.onStartOrPauseTimer}
            >
              <img
                className="timer-controller-icon"
                src={timerStatusIcon}
                alt={timerStatusAltText}
              />
              <p className="timer-controller-label">
                {isTimerRunning ? 'Pause' : 'Play'}
              </p>
            </button>
            <button
              className="timer-controller-btn"
              type="button"
              onClick={this.resetTimer}
            >
              <img
                className="timer-controller-icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              <p className="timer-controller-label">Reset</p>
            </button>
            <div className="timer-set-container">
              <p className="timer-controller-label" htmlFor="controllerTime">
                Set Timer
              </p>
              <div className="timer-set-controller">
                <button
                  className="timer-controller"
                  onClick={this.decreaseByMinute}
                  type="button"
                >
                  -
                </button>
                <h1 className="controller-time" id="controllerTime">
                  {timeLimitInMinutes}
                </h1>
                <button
                  className="timer-controller"
                  onClick={this.increaseByMinute}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
