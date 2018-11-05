import React, { Component } from 'react'

import Edit from 'material-ui/svg-icons/navigation/menu'
import Checkbox from 'material-ui/Checkbox'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import MoveHandlerIcon from './Styles/MoveHandlerIcon'
import IconButton from 'material-ui/IconButton'

import StyledP from './Styles/StyledP'
import Li from './Styles/Li'
import Ul from './Styles/Ul'

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

const DragHandle = SortableHandle(() => (
  <MoveHandlerIcon />
))

const List = SortableElement(({...props}) => {
  return (
    <Li>
      <div>
        <Checkbox
          checked={props.marked}
          onCheck={() => props.onUpdateCheck(props.indexFix, props.marked)}
        />
      </div>
      <div style={{ justifyContent: 'flex-start', width: '60%' }}>
        {props.marked ? (
          <StyledP>{props.value}</StyledP>
        ) : (
          <p>{props.value}</p>
        )}
      </div>
      <div>
        <IconMenu
          iconButtonElement={<IconButton><Edit /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText='Edit'
            onClick={() => props.onEdit(props.indexFix)}
          />
          <MenuItem
            primaryText='Delete'
            onClick={() => props.onDelete(props.indexFix)}
          />
          <MenuItem
            primaryText='Delete all checked'
            onClick={() => props.onDeleteAllChecked()}
          />
        </IconMenu>
        <DragHandle />
      </div>
    </Li>
  )
})

const SortableList = SortableContainer(({ items, onUpdateCheck, onDelete, onDeleteAllChecked, onEdit }) => {
  return (
    <Ul>
      {items.map((value, index) => (
        <List
          value={value.item}
          index={index}
          indexFix={index}
          key={`item-${index}`}
          keyFix={`item-${index}`}
          marked={value.marked}
          onUpdateCheck={onUpdateCheck}
          onDelete={onDelete}
          onEdit={onEdit}
          onDeleteAllChecked={onDeleteAllChecked}
        />
      ))}
    </Ul>
  )
})

class ListItems extends Component {
  constructor () {
    super()
    this.updateCheck = this.updateCheck.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDeleteAllChecked = this.onDeleteAllChecked.bind(this)

    this.booleanTrue = true
  }

  updateCheck (index, marked) {
    this.props.updateCheck(index, marked)
  }

  onSortEnd ({ oldIndex, newIndex }) {
    this.props.onSortEnd(this.props.items, oldIndex, newIndex)
  }

  onDelete (index) {
    this.props.onDelete(index)
  }

  onEdit (index) {
    this.props.onEdit(index)
  }

  onDeleteAllChecked () {
    this.props.onDeleteAllChecked()
  }

  render () {
    return (
      <SortableList
        items={this.props.items}
        useDragHandle
        pressDelay={100}
        pressThreshold={5}
        onSortEnd={this.onSortEnd}
        onUpdateCheck={this.updateCheck}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onDeleteAllChecked={this.onDeleteAllChecked}
      />
    )
  }
}

export default ListItems
