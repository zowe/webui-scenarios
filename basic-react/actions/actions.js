/**
  This program and the accompanying materials are made available under the terms of the 
  Eclipse Public License v2.0 which accompanies this distribution, and is available at
  https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright IBM Corporation 2018
**/
import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_VARIABLE = 'SELECT_VARIABLE'
export const INVALIDATE_VARIABLE = 'INVALIDATE_VARIABLE'
import { BASE_URL } from '../Constants'

export function selectVariable(variable) {
  return {
    type: SELECT_VARIABLE,
    variable
  }
}
function extractor(json) {
  var arr = []
  var arr1 = []
  for (var i = 0; i < json.length; i++) {
    arr1[json[i].name] = json[i].value
    //    arr[i] =  json[i].value;
  }
  console.log(arr1)
  return arr
}

export function invalidateVariable(variable) {
  return {
    type: INVALIDATE_VARIABLE,
    variable
  }
}

function requestPosts(variable) {
  return {
    type: REQUEST_POSTS,
    variable
  }
}

function receivePosts(variable, json) {
  return {
    type: RECEIVE_POSTS,
    variable,
    posts: json,
    receivedAt: Date.now()
  }
}

function fetchPosts(variable) {
  return dispatch => {
    dispatch(requestPosts(variable))
    let header = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    return fetch(`${BASE_URL}/jzos/environmentVariable`, {
      header: header,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(variable, json)))
      .catch(error => console.log(error))
  }
}

function shouldFetchPosts(state, variable) {
  const posts = state.postsByVariable[variable]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(variable) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), variable)) {
      return dispatch(fetchPosts(variable))
    }
  }
}
