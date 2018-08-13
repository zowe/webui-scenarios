/**
  This program and the accompanying materials are made available under the terms of the 
  Eclipse Public License v2.0 which accompanies this distribution, and is available at
  https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright IBM Corporation 2018
**/
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import * as ibmcolors from '../themes/ibmcolors'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const store = configureStore()

const lightTheme = getMuiTheme({
  palette: {
    primary1Color: ibmcolors.ibmBlueDark,
    primary2Color: ibmcolors.ibmBlue,
    primary3Color: ibmcolors.ibmGray30,
    accent1Color: ibmcolors.ibmBluePale,
    accent2Color: ibmcolors.ibmNWhite30,
    accent3Color: ibmcolors.ibmCGray40,
    textColor: ibmcolors.ibmDarkText,
    alternateTextColor: ibmcolors.ibmWhite,
    canvasColor: ibmcolors.ibmCyanPale
  }
})

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={lightTheme}>
          <AsyncApp />
        </MuiThemeProvider>
      </Provider>
    )
  }
}
