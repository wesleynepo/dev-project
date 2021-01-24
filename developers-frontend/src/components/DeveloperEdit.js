import { Paper, Box } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateDeveloper } from '../reducers/developerReducer'
import DeveloperFormGroup from './DeveloperFormGroup'

import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
    },
  }),
)

const DeveloperEdit = ({ developer }) => {

  const options = [{ title: 'Masculine', tag: 'M' },{ title: 'Feminine', tag: 'F' }, { title: 'Undefined', tag: 'U' }]
  const [ name, setName ] = useState(developer.nome)
  const [ age, setAge ] = useState(developer.idade)
  const [ hobby, setHobby ] = useState(developer.hobby)
  const [ birthDate, setBirthDate ] = useState(developer.datanascimento.substring(0,10))
  const [ gender, setGender ] = useState(options.find(option => option.tag === developer.sexo))
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleEdit = (event) => {
    event.preventDefault()

    const updatedDeveloper = {
      idade: Number(age),
      hobby,
      sexo: gender.tag,
      datanascimento: birthDate
    }

    dispatch(updateDeveloper( developer.id, updatedDeveloper ))
  }

  return (
    <Paper elevation={3}>
      <Box p={5}>
        <DeveloperFormGroup
          handleForm={handleEdit}
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

export default DeveloperEdit