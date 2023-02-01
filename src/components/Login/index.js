import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
    showError: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      showError: true,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
  }

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangePin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-image-container">
          <div className="container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="image"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div>
              <h1 className="main-heading"> Welcome Back!</h1>
            </div>
            <div className="user-id-card">
              <label htmlFor="userId" className="user-id">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                className="user-id-input"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="password-card">
              <label htmlFor="pin" className="pin">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                className="pin-input"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-msg"> {errorMsg} </p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
