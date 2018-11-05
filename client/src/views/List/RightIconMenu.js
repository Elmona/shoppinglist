import React from 'react'

import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon />
  </IconButton>
)

const rightIconMenu = (id, title, deleteList, showDialog, share) => {
  return (
    <IconMenu iconButtonElement={iconButtonElement}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem onClick={() => showDialog(id, title)}>Edit name</MenuItem>
      <MenuItem onClick={() => deleteList(id)}>Delete</MenuItem>
      <MenuItem onClick={() => share(id)}>Share</MenuItem>
    </IconMenu>
  )
}

export default rightIconMenu
