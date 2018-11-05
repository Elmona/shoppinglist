import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class DialogChangeName extends Component {
  render () {
    const {
      title,
      textFieldValue,
      textFieldChange,
      open,
      onClose,
      onConfirmed
    } = this.props

    const actions = [
      <FlatButton
        label='Cancel'
        onClick={onClose}
      />,
      <RaisedButton
        label='Confirm'
        onClick={onConfirmed}
      />
    ]

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        onRequestClose={onClose}
        open={open}
      >
        <TextField
          value={textFieldValue}
          onChange={textFieldChange}
          maxLength='19'
        />
      </Dialog>
    )
  }
}

export default DialogChangeName
