import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import fuzzysearch from 'fuzzysearch';
import {darkBlack} from 'material-ui/styles/colors';

module.exports = React.createClass({
  displayName: 'TableList',

  getDefaultProps () {
    return {
      items: [],
      newItemId: '',
      onItemSelect: () => {}
    }
  },

  getInitialState () {
    return {
      items: this.props.items,
      allItems: this.props.items
    }
  },

//   contextTypes: {
//     muiTheme: React.PropTypes.object.isRequired
//   },

  render () {
    if (this.state._isFetching) return this.renderLoading()

    if (!this.state.items || !this.state.items.length) {
      return this.renderNone()
    }

    const boxStyle = {
      display: 'flex',
      flexFlow: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start'
    }

    const itemStyle = {
      width: 256,
      flex: '1 0 auto'
    }

    return (
      <div style={{position: 'relative'}}>
        {this.renderHeader()}

        <div style={boxStyle}>
          {this.state.items.map((item, i) => {
            const iconStyle = {
              color: 'rgba(200,0,0,0.4)',
              marginLeft: 2,
              fontSize: 18
            }
            const icon = (
              <IconButton tooltip={this.props.warningToolTipText}
                iconClassName='material-icons'
                style={{height: 0, width: 0, padding: 0}}
                iconStyle={iconStyle} >
                announcement
              </IconButton>
            )

            const primary = (
              <div>
                {item.name}
                {item.warning ? icon : ''}
              </div>
            )

            const listItem = (
              <ListItem
                key={i}
                style={itemStyle}
                primaryText={primary}
                onClick={this._selectItem.bind(this, i)}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>{item.subtext}</span><br/>
                    {item.metadata[this.props.showMetaData]}
                  </p>
                }
                secondaryTextLines={2} />
            )

            return listItem
          })}
        </div>
      </div>
    )
  },

  renderLoading () {
    return (
      <div style={{textAlign: 'center', clear: 'both', padding: 50}}>
        <CircularProgress mode={'indeterminate'}/>
      </div>
    )
  },

  renderNone () {
    const text = 'No ' + this.props.header + ' found.'
    return (
      <div style={{position: 'relative'}}>
        {this.renderHeader()}
        <p>{text}</p>
      </div>
    )
  },

  renderHeader () {
    return (
      <div>
        <h4>{this.props.header}</h4>

        <div style={{position: 'absolute', top: -15, right: 20}}>
          <TextField
            hintText='Search'
            onChange={this._search} />
        </div>
      </div>
    )
  },

  _selectItem (i) {
    const item = this.state.items[i]
    this.props.onItemSelect(item)
  },

  _search (evt) {
    const searchTerm = evt.target.value.toLowerCase()
    if (!searchTerm) return this.setState({items: this.state.allItems})
    const searchIndex = this.props.searchIndex

    const matches = []
    this.state.allItems.forEach((item) => {
      const searchItem = item.metadata[searchIndex]
      console.log(fuzzysearch);
      if (fuzzysearch(searchTerm, item.metadata.id)) return matches.push(item)
      if (fuzzysearch(searchTerm, item.name.toLowerCase())) return matches.push(item)
      if (searchItem && fuzzysearch(searchTerm, searchItem)) return matches.push(item)
    })
    this.setState({items: matches})
  }
})
