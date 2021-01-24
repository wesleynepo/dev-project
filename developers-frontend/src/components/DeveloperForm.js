import { Paper, Box, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createDeveloper } from '../reducers/developerReducer'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeveloperFormGroup from './DeveloperFormGroup'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
    },
  }),
)

const DeveloperForm = () => {

  const options = [{ title: 'Masculine', tag: 'M' },{ title: 'Feminine', tag: 'F' }, { title: 'Undefined', tag: 'U' }]
  const [ name, setName ] = useState('')
  const [ age, setAge ] = useState('')
  const [ hobby, setHobby ] = useState('')
  const [ birthDate, setBirthDate ] = useState('2000-01-01')
  const [ gender, setGender ] = useState(options[0])
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const handleCreate = (event) => {
    event.preventDefault()

    const newDeveloper = {
      nome: name,
      idade: Number(age),
      hobby,
      sexo: gender.tag,
      datanascimento: birthDate
    }

    dispatch(createDeveloper(newDeveloper))
    history.push('/developers')
  }

  return (
    <Paper style={{ marginTop: 100 }} elevation={3} >
      <Box p={5}>
        <Typography variant="h4">Create a new developer</Typography>
        <DeveloperFormGroup
          handleForm={handleCreate}
          classes={classes}
          name={name}
          age={age}
          hobby={hobby}
          birthDate={birthDate}
          gender={gender}
          options={options}
          handleAge={ (e) => { setAge(e.target.value) } }
          handleHobby={ (e) => { setHobby(e.target.value) } }
          handleBirthDate={ (e) => { setBirthDate(e.target.value) } }
          handleGender={ (e) => { setGender(e.target.value) } }
          handleName={ (e) => { setName(e.target.value) } }
        />
      </Box>
    </Paper>
  )
}

export default DeveloperForm