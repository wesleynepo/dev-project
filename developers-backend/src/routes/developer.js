const express = require('express')
const developersService = require('../services/developer')
const router = express.Router()

router.get('/', async ( request, response ) => {

  const page = Number(request.query.page)
  const limit = Number(request.query.limit)  
  const { queryString } = request

  let developers

  if( !isNaN(page) && !isNaN(limit) ){
    developers = await developersService.getPaginate(page,limit,queryString)
  }else {
    developers = await developersService.getAll(queryString)
  }

  if(developers.length !== 0 && queryString){
    response.send(developers)
  }else {
    response.sendStatus(404)
  }

})

router.get('/:id', async (request, response) => {
  const developer = await developersService.getOneById(request.params.id)
  if (developer) {
    response.json(developer)
  } else {
    response.status(404).end()
  }
})

router.post('/', async ( request, response ) => {
  const createdDeveloper = await developersService.save(request.body)
  response.status(201).send(createdDeveloper)
})

router.put('/:id', async ( request, response ) => {
  const updatedDeveloper = await developersService.update(request.params.id, request.body)
  response.status(200).send(updatedDeveloper)
})

router.delete('/:id', async ( request, response ) => {
  await developersService.deleteById(request.params.id)
  response.status(204).end()
})


module.exports = router