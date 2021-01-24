import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Input, FormControl, InputLabel, TextField, Button } from '@material-ui/core'

const DeveloperFormGroup = (props) => {

  return (
    <form className={props.classes.root} autoComplete="off" onSubmit={props.handleForm}>
      <FormControl>
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input required onChange={props.handleName} value={props.name} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Age</InputLabel>
        <Input onChange={props.handleAge} value={props.age} type="number" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Hobby</InputLabel>
        <Input onChange={props.handleHobby} value={props.hobby}/>
      </FormControl>
      <FormControl>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          value={props.birthDate}
          onChange={props.handleBirthDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl>
        <Autocomplete
          options={props.options}
          getOptionLabel={(option) => option.title }
          style={{ width: 200 }}
          getOptionSelected={(option) => option.tag }
          onChange={props.handleGender}
          value={props.gender}
          renderInput={(params) => <TextField {...params} label="Sex" variant="outlined" />}
        />
      </FormControl>
      <div>
        <Button color="primary" variant="contained" type="submit" startIcon={<SaveIcon/>}>Save</Button>
      </div>
    </form>
  )}

export default DeveloperFormGroup