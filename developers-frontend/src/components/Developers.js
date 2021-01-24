import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ListItem, Button, Paper,Typography, Box, List } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 100,
      margin: theme.spacing(1)
    },
    grow:{
      flexGrow: 1,
    }
  },
  ),
)

const Developers = ({ developers }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Box p={5}>
        <Typography variant="h3">Developers</Typography>
        <List>
          {developers.map(developer =>
            <ListItem key={developer.id} button component={Link} to={`/developers/${developer.id}`}>
              {developer.nome}
              <div className={classes.grow}/>
            </ListItem>
          )}
        </List>
        <Button color="primary" variant="contained" startIcon={<Add/>} onClick={() => {history.push('/create')}}>new developer</Button>
      </Box>
    </Paper>
  )}

export default Developers