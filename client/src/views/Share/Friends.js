import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { getToken } from '../../components/AuthService'
import axios from 'axios'

const Add = (name, id, done) => {
  console.log('Add ', name)
  console.log('ID: ', id)

  axios(`/api/share`, {
    method: 'POST',
    headers: {
      token: getToken(),
      id: id,
      name: name
    }
  })
    .then(data => done())
}

const Friends = props => {
  const { friends, id, done } = props
  const listItems = friends
    .map(name => <ListItem
      onClick={() => Add(name, id, done)}
      key={name}
    >
      {name}
    </ListItem>)
  return (
    <List>
      {listItems}
    </List>
  )
}

export default Friends
