const Developer = require('../models/developer')
require('express-async-errors')

const getAll = (query) => { 
  return Developer.find(query)
}

const getPaginate = (page,limit,query) => { 
  return Developer.find(query).skip(page).limit(limit)
}

const getOneById = async (id) => {
  const developer = await Developer.findById(id)

  if(developer){
    return developer.toJSON()  
  }

  return developer
}

const deleteById = (id) => {
  return Developer.findByIdAndDelete(id)
}

const update = async (id, developer) => {
  return await Developer.findByIdAndUpdate(id, developer, { new:true } )
}

const save = ( developer ) => {
  const newDeveloper = new Developer(developer)

  return newDeveloper.save()
}


module.exports = {
  getAll,
  getOneById,
  deleteById,
  update,
  save,
  getPaginate
}