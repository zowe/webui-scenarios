/**
  This program and the accompanying materials are made available under the terms of the 
  Eclipse Public License v2.0 which accompanies this distribution, and is available at
  https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright IBM Corporation 2018
**/
import { combineReducers } from 'redux'
import {
  SELECT_VARIABLE,
  INVALIDATE_VARIABLE,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/actions'

function selectedVariable(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_VARIABLE:
      return action.variable
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_VARIABLE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByVariable(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_VARIABLE:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.variable]: posts(state[action.variable], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByVariable,
  selectedVariable
})

export default rootReducer
