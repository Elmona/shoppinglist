import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class DialogChangeName extends Component {
  render () {
    const {
      title,
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
      />
    )
  }
}

export default DialogChangeName
