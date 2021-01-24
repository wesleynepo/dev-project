import developerService from '../services/developers'

const developerReducer = (state = [], action) => {

  switch(action.type) {
  case 'NEW_DEVELOPER':
    return [...state, action.data]
  case 'INIT_DEVELOPERS':
    return action.data
  case 'DELETE_DEVELOPER':
    return state.filter( developer => developer.id !== action.data.id )
  case 'UPDATE_DEVELOPER':
    return state.map( developer => developer.id === action.data.id ? action.data : developer )
  default:
    return state
  }
}

export const createDeveloper = developer => {
  return async dispatch => {
    const newDeveloper = await developerService.createNew(developer)
    dispatch({
      type: 'NEW_DEVELOPER',
      data: newDeveloper,
    })
  }
}

export const initializeDevelopers = () => {
  return async dispatch => {
    const developers = await developerService.getAll()

    dispatch({
      type: 'INIT_DEVELOPERS',
      data: developers,
    })
  }
}

export const removeDeveloper = id => {
  return async dispatch => {
    await developerService.deleteByID(id)
    dispatch({
      type:'DELETE_DEVELOPER',
      data: { id }
    })
  }
}

export const updateDeveloper = (id, developer) => {
  return async dispatch => {
    const updatedDeveloper = await developerService.update(id, developer)
    dispatch({
      type:'UPDATE_DEVELOPER',
      data: updatedDeveloper
    })
  }
}


export default developerReducer