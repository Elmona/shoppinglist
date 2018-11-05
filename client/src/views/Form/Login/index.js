import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import { login } from '../../../components/AuthService'

import Form from '../Styles/Form'
import Container from '../../Styles/Container'
import ButtonContainer from '../Styles/ButtonContainer'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userNameError: '',
      passwdError: '',
      userName: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.userName.length <= 0) {
      this.setState({ userNameError: 'Please fill in username' })
    } else if (this.state.password.length <= 0) {
      this.setState({ passwordError: 'Please fill in password' })
    } else {
      login(this.state.userName, this.state.password)
        .then(res => {
          this.props.history.replace('/')
        }).catch(e => {
          console.log(e)
          this.setState({ userNameError: 'Username or password is wrong.' })
        })
    }
  }

  onChange(e, field) {
    if (field === 'userName') {
      this.setState({ userName: e.target.value })
      if (e.target.value.length > 0) this.setState({ userNameError: '' })
    } else if (field === 'password') {
      this.setState({ password: e.target.value })
      if (e.target.value.length > 0) this.setState({ passwordError: '' })
    }
  }

  render() {
    return (
      <Container>
        <Paper>
          <Form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <TextField
              floatingLabelText='Username'
              onChange={e => this.onChange(e, 'userName')}
              errorText={this.state.userNameError}
            />
            <TextField
              floatingLabelText='Password'
              type='password'
              onChange={e => this.onChange(e, 'password')}
              errorText={this.state.passwordError}
            />
            <ButtonContainer>
              <Button
                label='Login'
                type='submit'
              />
            </ButtonContainer>
          </Form>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <a href='/signup' style={{ margin: '10px', marginTop: '0px' }}>Signup</a>
          </div>
        </Paper>
      </Container>
    )
  }
}

export default Login
