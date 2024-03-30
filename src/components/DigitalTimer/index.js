// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInSeconds: 0, timeLimitInMinutes: 25}

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timeLimitInMinutes} = this.state
    let secCount = timeInSeconds
    let minCount = timeLimitInMinutes
    if (!isTimerRunning) {
      this.intervalId = setInterval(() => {
        if (secCount !== 0) {
          secCount -= 1
          console.log(secCount)
          this.setState(prevState => ({
            timeInSeconds: prevState.timeInSeconds - 1,
          }))
        } else if (secCount === 0 && minCount !== 0) {
          secCount = 59
          minCount -= 1
          console.log(secCount)
          this.setState(prevState => ({
            timeInSeconds: 59,
            timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
          }))
        }
      }, 1000)
    } else {
      clearInterval(this.intervalId)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  increaseByMinute = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
      }))
    }
  }

  decreaseByMinute = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  resetTimer = () => {
    clearInterval(this.intervalId)
    this.setState({timeInSeconds: 0, timeLimitInMinutes: 25, isTimerRunning: false})
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
    const elapsedTime = `${stringifiedMinutes}:${stringifiedSeconds}`
    const setTimerLimit = timeLimitInMinutes >25 ? timeLimitInMinutes : 25
    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="card-container">
          <div className="digital-timer-container">
            <div className="digital-time">
              <h1 className="time">
                {elapsedTime}
              </h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-controller-container">
            <button
              className="timer-controller-btn timer-controller-label"
              type="button"
              onClick={this.onStartOrPauseTimer}
            >
              <img
                className="timer-controller-icon"
                src={timerStatusIcon}
                alt={timerStatusAltText}
              />
              
                {isTimerRunning ? 'Pause' : 'Start'}
              
            </button>
            <button
              className="timer-controller-btn timer-controller-label"
              type="button"
              onClick={this.resetTimer}
            >
              <img
                className="timer-controller-icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              Reset
            </button>
            <div className="timer-set-container">
              <p className="timer-controller-label" htmlFor="controllerTime">
                Set Timer limit
              </p>
              <div className="timer-set-controller">
                <button
                  className="timer-controller"
                  onClick={this.decreaseByMinute}
                  type="button"
                >
                  -
                </button>
                <p className="controller-time" id="controllerTime">
                  {setTimerLimit}
                </p>
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
