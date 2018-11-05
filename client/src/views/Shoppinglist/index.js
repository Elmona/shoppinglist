import React, { Component } from 'react'
import { arrayMove } from 'react-sortable-hoc'
import { getToken } from '../../components/AuthService'
import io from 'socket.io-client'
import axios from 'axios'

import IconContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Paper from 'material-ui/Paper'

import ListItems from './ListItems'
import Container from '../Styles/Container'
import Form from '../Styles/Form'
import DialogEdit from '../../components/DialogEdit'

class App extends Component {
  constructor(props) {
    super(props)
    this.booleanTrue = true
    this.state = {
      title: '',
      id: '',
      items: [],
      input: ''
    }

    if (process.env.NODE_ENV === 'development') {
      this.socket = io('', { query: `token=${getToken()}` })
    } else {
      this.socket = io('', { path: '/api/socket.io', query: `token=${getToken()}` })
    }

    this.socket.on('list', data => {
      this.setState({
        items: [...data.items]
      })
    })

    // TODO: Need to work on this!
    // this.socket.on('error', () => this.props.history.replace('/login'))

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddNewItem = this.handleAddNewItem.bind(this)
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.setState({ id: params.id })

    this.socket.emit('join', params.id)

    axios.get('/api/list', {
      headers: {
        token: getToken(),
        id: params.id
      }
    })
      .then(x => {
        this.setState({
          title: x.data.title,
          items: [...x.data.list]
        })
      })
  }

  sendDataToServer() {
    this.socket.emit('list', {
      token: getToken(),
      items: this.state.items
    })
  }

  handleAddNewItem(e) {
    e.preventDefault()
    if (this.state.input.length > 0) {
      let temp = {
        item: this.state.input,
        marked: false
      }
      this.setState({
        timestamp: Date.now(),
        input: '',
        items: [...this.state.items, temp]
      }, () => this.sendDataToServer())
    }
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value })
  }

  onSortChange(newList, oldIndex, newIndex) {
    this.setState({
      items: arrayMove(newList, oldIndex, newIndex)
    }, () => this.sendDataToServer())
  }

  updateCheck(index, marked) {
    const items = this.state.items
    items[index].marked = !marked
    this.setState({ items }
      , () => this.sendDataToServer())
  }

  onDelete(index) {
    const items = this.state.items
    items.splice(index, 1)
    this.setState({ items }
      , () => this.sendDataToServer())
  }

  onEdit(index) {
    console.log(`${index}`)
    this.setState({
      showDialog: true,
      changeItem: this.state.items[index].item,
      changeIndex: index
    })
  }

  deleteAllChecked() {
    console.log('Should delete all checked')
    let data = this.state.items
    data = data.filter(x => x.marked === false)
    this.setState({ items: data }, () => this.sendDataToServer())
  }

  render() {
    return (
      <Container>
        <Paper
          style={{ paddingBottom: '2px' }}
          zDepth={2}
        >
          <AppBar
            style={{ marginBottom: '10px' }}
            title={this.state.title}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            /* iconElementRight={<IconButton><MoreVertIcon /></IconButton>} */
            onLeftIconButtonClick={() => {
              this.socket.disconnect()
              this.props.history.replace('/')
            }}
          />
          <Form onSubmit={this.handleAddNewItem}>
            <TextField
              floatingLabelText='Add'
              value={this.state.input}
              onChange={this.handleInputChange}
              maxLength='19'
            />
            <FloatingActionButton
              mini={this.booleanTrue}
              onClick={this.handleAddNewItem}
            >
              <IconContentAdd />
            </FloatingActionButton>
          </Form>
          <ListItems
            items={this.state.items}
            onSortEnd={(newList, oldIndex, newIndex) => {
              this.onSortChange(newList, oldIndex, newIndex)
            }}
            updateCheck={(index, marked) => this.updateCheck(index, marked)}
            onDelete={(index) => this.onDelete(index)}
            onEdit={(index) => this.onEdit(index)}
            onDeleteAllChecked={() => this.deleteAllChecked()}
          />
          <DialogEdit
            title='Edit item.'
            textFieldChange={e => this.setState({ changeItem: e.target.value })}
            textFieldValue={this.state.changeItem}
            open={this.state.showDialog}
            onClose={() => this.setState({ showDialog: false })}
            onConfirmed={() => {
              let items = this.state.items
              items[this.state.changeIndex].item = this.state.changeItem
              this.setState({
                showDialog: false,
                items: items
              }, () => this.sendDataToServer())
            }}
          />
        </Paper>
      </Container>
    )
  }
}

export default App
