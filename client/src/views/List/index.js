import React, { Component } from 'react'
import axios from 'axios'

import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import ListIcon from 'material-ui/svg-icons/action/shopping-cart'
import IconContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import TextField from 'material-ui/TextField'

import SignOut from './Styles/SignOut'
import { logout, getToken } from '../../components/AuthService'
import Container from '../Styles/Container'
import Form from '../Styles/Form'
import RightIconMenu from './RightIconMenu'

import DialogEdit from '../../components/DialogEdit'
import Dialog from '../../components/Dialog'

class Lists extends Component {
  constructor () {
    super()
    this.booleanTrue = true
    this.state = {
      changeId: '',
      changeName: '',
      showDialog: false,
      showDialogDelete: false,
      input: '',
      data: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNewList = this.handleNewList.bind(this)
    this.updateLists = this.updateLists.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.dialogChangeValue = this.dialogChangeValue.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.share = this.share.bind(this)
  }

  componentDidMount () {
    this.updateLists()
  }

  updateLists () {
    axios.get('/api/lists', {
      headers: {
        token: getToken()
      }
    })
      .then(x => {
        console.log(x.data)
        this.setState({
          data: [...x.data]
        })
      }).catch(e => this.props.history.replace('/login'))
  }

  handleNewList (e) {
    e.preventDefault()
    if (this.state.input.length > 0) {
      axios({
        method: 'POST',
        url: '/api/lists',
        headers: {
          token: getToken(),
          name: this.state.input
        }
      }).then(() => this.updateLists())
    }
  }

  handleInputChange (e) {
    this.setState({ input: e.target.value })
  }

  handleClick (id) {
    this.props.history.replace(`/${id}`)
  }

  formatDate (date) {
    date = new Date(date)
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleString('en-GB', options)
  }

  showDialog (id, title) {
    this.setState({ showDialog: true, changeName: title, changeId: id })
  }

  hideDialog () {
    this.setState({ showDialog: false })
  }

  dialogChangeValue (e) {
    this.setState({ changeName: e.target.value })
  }

  deleteList (id) {
    this.setState({ showDialogDelete: true, idToDelete: id })
  }

  share (id) {
    this.props.history.replace(`/share/${id}`)
  }

  render () {
    return (
      <Container>
        <Paper zDepth={2}>
          <AppBar
            style={{ marginBottom: '10px' }}
            title='Shoppinglist'
            showMenuIconButton={false}
            iconElementRight={<SignOut onClick={() => logout()}>Sign out</SignOut>}
          />

          <Form onSubmit={this.handleNewList}>
            <TextField
              floatingLabelText='New list'
              value={this.state.input}
              onChange={this.handleInputChange}
            />
            <FloatingActionButton
              mini={this.booleanTrue}
              onClick={this.handleNewList}
            >
              <IconContentAdd />
            </FloatingActionButton>
          </Form>

          <List>
            {this.state.data.map((value) => (
              <ListItem
                key={value._id}
                onClick={() => this.handleClick(value._id)}
                leftIcon={<ListIcon />}
                rightIconButton={RightIconMenu(value._id, value.title, this.deleteList, this.showDialog, this.share)}
                primaryText={value.title}
                secondaryText={value.users.join(', ')}
              />
            ))}
          </List>

          <DialogEdit
            title='Edit name of list.'
            textFieldChange={this.dialogChangeValue}
            textFieldValue={this.state.changeName}
            open={this.state.showDialog}
            onClose={this.hideDialog}
            onConfirmed={() => {
              this.setState({ showDialog: false })
              if (this.state.changeName.length > 0) {
                axios({
                  method: 'POST',
                  url: '/api/changeName',
                  headers: {
                    token: getToken(),
                    id: this.state.changeId,
                    title: this.state.changeName
                  }
                }).then(() => this.updateLists())
              }
            }}
          />

          <Dialog
            title='Are you sure you want to delete this?'
            open={this.state.showDialogDelete}
            onClose={() => this.setState({ showDialogDelete: false })}
            onConfirmed={() => {
              this.setState({ showDialogDelete: false })
              axios({
                method: 'POST',
                url: '/api/delete',
                headers: {
                  token: getToken(),
                  id: this.state.idToDelete
                }
              }).then(() => this.updateLists())
            }}
          />
        </Paper>
      </Container>
    )
  }
}

export default Lists
