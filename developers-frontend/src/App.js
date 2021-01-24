import React, { useEffect } from 'react'
import Developers from './components/Developers'
import DeveloperForm from './components/DeveloperForm'
import Developer from './components/Developer'
import Home from './components/Home'
import { Container  } from '@material-ui/core'
import { initializeDevelopers } from './reducers/developerReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Navigation from './components/Navigation'


const App = () => {

  const dispatch = useDispatch()
  const developers = useSelector( state => state.developers )
  const match = useRouteMatch('/developers/:id')
  const developer = match ? developers.find(developer => developer.id === match.params.id ) : null

  useEffect(() => {
    dispatch(initializeDevelopers())
  },[dispatch])

  return (
    <Container>
      <Navigation/>
      <Switch>
        <Route path="/developers/:id">
          <Developer developer={developer}/>
        </Route>
        <Route path="/developers">
          <Developers developers={developers}/>
        </Route>
        <Route path="/create">
          <DeveloperForm/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  )
}

export default App