import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Container from '../Styles/Container'
import axios from 'axios'
import { getToken } from '../../components/AuthService'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

// import Title from './Styles/Title'
import TextField from 'material-ui/TextField'
import Form from '../Styles/Form'
import Search from 'material-ui/svg-icons/action/search'
import Friends from './Friends'

class Share extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      inputError: '',
      friends: []
    }
  }

  componentDidMount () {
    const { match: { params } } = this.props
    this.setState({ id: params.id })
    console.log(this.props)

    this.getFriends()
  }

  handleSearch (e) {
    e.preventDefault()
    axios('/api/share', {
      method: 'POST',
      headers: {
        token: getToken(),
        username: this.state.search
      }
    })
      .then(data => {
        console.log('Should update lists')
        this.getFriends()
        this.setState({search: '', message: 'User added'})
      })
      .catch(e => {
        if (e.response.data === 'User not found') {
          this.setState({inputError: 'User not found.'})
        }
      })
  }

  getFriends () {
    axios('/api/share', {
      method: 'GET',
      headers: {
        token: getToken(),
        username: this.state.search
      }
    })
      .then(data => this.setState({ friends: data.data }))
      .catch(e => console.log('e'))
  }

  render () {
    return (
      <Container>
        <Paper
          style={{ paddingBottom: '10px' }}
          zDepth={2}
        >
          <AppBar
            style={{ marginBottom: '15px' }}
            title='Share list'
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonClick={() => {
              this.props.history.replace('/')
            }}
          />
          <Form onSubmit={e => this.handleSearch(e)}>
            <TextField
              floatingLabelText='Search for friend.'
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value, inputError: '' })}
              errorText={this.state.inputError}
            />
            <FloatingActionButton
              mini
              onClick={e => this.handleSearch(e)}
            >
              <Search />
            </FloatingActionButton>
          </Form>
          <div><h5 style={{textAlign: 'center'}}>{this.state.message}</h5></div>
          <div>
            <Friends
              friends={this.state.friends}
              id={this.state.id}
              done={() => this.setState({message: 'User added successfully'})} />
          </div>
        </Paper>
      </Container>
    )
  }
}

export default Share
