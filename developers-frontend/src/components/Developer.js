import React, { useState } from 'react'
import { Paper, Box, Typography, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { removeDeveloper } from '../reducers/developerReducer'
import DeveloperEdit from './DeveloperEdit'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        marginTop: 50
      },
    },
    others:{
      margin: theme.spacing(1),
    }
  }),
)

const Developer = ({ developer }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [ displayEdit, setDisplayEdit ] = useState('none')

  if(!developer){
    return <Typography variant="h5" style={{ marginTop: 100 }} >Developer not found!</Typography>
  }

  const handleDelete = async () => {
    dispatch(removeDeveloper(developer.id))
    history.push('/developers')
  }

  const date = new Date(developer.datanascimento)

  return (
    <div>
      <Paper className={classes.root}>
        <Box p={5}>
          <Typography variant="h3">{developer.nome}</Typography>
          <Typography variant="body1">Age: {developer.idade}</Typography>
          <Typography variant="body1">Sex: {developer.sexo}</Typography>
          <Typography variant="body1">Hobby: {developer.hobby}</Typography>
          <Typography variant="body1">Birth day: {date.toDateString()}</Typography>
          <Button color="primary" variant="contained" className={classes.others} onClick={() => { setDisplayEdit('')}} >Edit</Button>
          <Button color="secondary" variant="contained" className={classes.others} onClick={handleDelete}>Delete</Button>
        </Box>
      </Paper>
      <Box display={displayEdit}>
        <DeveloperEdit developer={developer} setDisplayEdit={setDisplayEdit}/>
      </Box>
    </div>
  )
}

export default Developer