/**
  This program and the accompanying materials are made available under the terms of the 
  Eclipse Public License v2.0 which accompanies this distribution, and is available at
  https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright IBM Corporation 2018
**/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectVariable,
  fetchPostsIfNeeded,
  invalidateVariable
} from '../actions/actions'
import Posts from '../components/Posts'
import RaisedButton from 'material-ui/RaisedButton'

import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar'
import { Card, CardHeader } from 'material-ui/Card'

injectTapEventPlugin()

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedVariable } = this.props
    dispatch(fetchPostsIfNeeded(selectedVariable))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedVariable !== prevProps.selectedVariable) {
      const { dispatch, selectedVariable } = this.props
      dispatch(fetchPostsIfNeeded(selectedVariable))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectVariable(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedVariable } = this.props
    dispatch(invalidateVariable(selectedVariable))
    dispatch(fetchPostsIfNeeded(selectedVariable))
  }

  render() {
    const { posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <AppBar title="Java z/OS Variables" showMenuIconButton={false} />
        <Card>
          {lastUpdated && (
            <CardHeader
              title={
                'Last updated at ' + new Date(lastUpdated).toLocaleTimeString()
              }
            />
          )}
          {!isFetching && (
            <RaisedButton
              label="Refresh"
              secondary={true}
              style={{ margin: '5px' }}
              onClick={this.handleRefreshClick}
              disabled={isFetching}
            />
          )}
          {isFetching && posts.length === 0 && <h2>Loading...</h2>}
          {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
          {posts.length > 0 && (
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
          )}
        </Card>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedVariable: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedVariable, postsByVariable } = state
  const { isFetching, lastUpdated, items: posts } = postsByVariable[
    selectedVariable
  ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedVariable,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
