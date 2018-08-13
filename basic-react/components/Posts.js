/**
  This program and the accompanying materials are made available under the terms of the 
  Eclipse Public License v2.0 which accompanies this distribution, and is available at
  https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright IBM Corporation 2018
**/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
  }
  renderRows() {
    const childComponents = [];
    this.props.posts.forEach(element => {
      childComponents.push(
        <TableRow key={element.name}>
          <TableRowColumn >{element.name}</TableRowColumn>
          <TableRowColumn >{element.value}</TableRowColumn>
        </TableRow>)
    });
    return childComponents;
  }
  render() {
    return (
      <Table >
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Variable Key</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderRows()}
        </TableBody>
      </Table>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}