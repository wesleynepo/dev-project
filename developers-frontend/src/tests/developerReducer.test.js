import developerReducer from '../reducers/developerReducer'
import deepFreeze from 'deep-freeze'

const initialState = [
  {
    nome: 'Wesley Nepomuceno',
    sexo: 'M',
    idade: '24',
    hobby: 'Bonsaísta',
    datanascimento: new Date('04-18-1996'),
    id: 'vvff'
  },
  {
    nome: 'Marcio Pili',
    sexo: 'M',
    idade: '20',
    hobby: 'Animes',
    datanascimento: new Date('01-18-2001'),
    id: 'vvssff'
  }
]


describe('developerReducer', () => {
  test('returns new state with action NEW_DEVELOPER', () => {
    const state = []
    const action = {
      type: 'NEW_DEVELOPER',
      data: {
        nome: 'Wesley',
        idade: 15,
        hobby: 'Wesley'
      }
    }

    deepFreeze(state)
    const newState = developerReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action NEW_DEVELOPER', () => {
    const state = initialState
    const action = {
      type: 'DELETE_DEVELOPER',
      data: { id: 'vvssff' }
    }

    deepFreeze(state)
    const newState = developerReducer(state, action)

    expect(newState).toHaveLength(1)
  })

  test('returns new state with action UPDATE_DEVELOPER', () => {
    const state = initialState
    const action = {
      type: 'UPDATE_DEVELOPER',
      data: { ...initialState[0], idade:25 }
    }

    deepFreeze(state)
    const newState = developerReducer(state, action)

    expect(newState).toHaveLength(2)

    const ages = newState.map( developers => developers.idade )

    expect(ages).toContain(25)

  })

})
