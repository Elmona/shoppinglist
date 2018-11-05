import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import { signup } from '../../../components/AuthService'

import Form from '../Styles/Form'
import Container from '../../Styles/Container'
import ButtonContainer from '../Styles/ButtonContainer'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userNameError: '',
      passwdError: '',
      passwdError2: '',
      emailError: '',
      userName: '',
      password: '',
      password2: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.state.userName.length <= 0) {
      this.setState({userNameError: 'Please fill in username'})
    } else if (this.state.password.length <= 0) {
      this.setState({passwordError: 'Please fill in password'})
    } else if (this.state.password !== this.state.password2) {
      this.setState({passwordError2: 'The password you entered is not the same'})
    } else if (this.state.email.length <= 0) {
      this.setState({emailError: 'Please fill in email'})
    } else {
      signup(this.state.userName, this.state.password, this.state.email)
        .then(x => {
          this.props.history.replace('/login')
        })
        .catch(e => {
          if (e === 'Username may only contain numbers, lowercase and uppercase letters. It must be between 3 to 10 characters long.') {
            this.setState({userNameError: 'Username may only contain numbers, lowercase and uppercase letters. It must be between 3 to 10 characters long.'})
          }
          if (e === 'Password is to short minimum length is 8 characters long') {
            this.setState({passwordError: 'Password is to short minimum length is 8 characters long'})
          }
          if (e === 'Username already taken') {
            this.setState({userNameError: 'Username already taken'})
          }
          console.log(e)
        })
    }
  }

  onChange (e, field) {
    if (field === 'userName') {
      this.setState({userName: e.target.value})
      if (e.target.value.length > 0) this.setState({userNameError: ''})
    } else if (field === 'password') {
      this.setState({password: e.target.value})
      if (e.target.value.length > 0) this.setState({passwordError: '', passwordError2: ''})
    } else if (field === 'password2') {
      this.setState({password2: e.target.value})
      if (e.target.value.length > 0) this.setState({password2Error: '', passwordError2: ''})
    } else if (field === 'email') {
      this.setState({email: e.target.value})
      if (e.target.value.length > 0) this.setState({emailError: ''})
    }
  }

  render () {
    return (
      <Container>
        <Paper>
          <Form onSubmit={this.handleSubmit}>
            <h1>Sign up</h1>
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
            <TextField
              floatingLabelText='Repeat password'
              type='password'
              onChange={e => this.onChange(e, 'password2')}
              errorText={this.state.passwordError2}
            />
            <TextField
              floatingLabelText='Email'
              onChange={e => this.onChange(e, 'email')}
              errorText={this.state.emailError}
            />
            <ButtonContainer>
              <Button
                label='Sign up'
                type='submit'
              />
            </ButtonContainer>
          </Form>
        </Paper>
      </Container>
    )
  }
}

export default Login
