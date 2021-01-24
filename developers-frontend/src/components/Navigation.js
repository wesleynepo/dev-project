import React from 'react'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import { AppBar, Toolbar, Typography, Link  } from '@material-ui/core'
import { Link as LinkRouter } from 'react-router-dom'

const Navigation = () => {

  const padding = {
    padding: 10
  }


  return (
    <AppBar position="fixed">
      <Toolbar>
        <AccessibilityIcon/>
        <Typography variant="h6" >

          <Link
            style={padding}
            color="inherit"
            component={LinkRouter}
            to="/">
                 Home
          </Link>

        </Typography>

        <Typography variant="h6" >

          <Link
            style={padding}
            color="inherit"
            component={LinkRouter}
            to="/developers">
                Developers
          </Link>

        </Typography>

      </Toolbar>
    </AppBar>
  )
}

export default Navigation