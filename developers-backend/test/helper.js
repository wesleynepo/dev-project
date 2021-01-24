const Developer = require('../src/models/developer')

const initialDevelopers = [
  {
    nome: 'Wesley Nepomuceno',
    sexo: 'M',
    idade: '24',
    hobby: 'Bonsaísta',
    datanascimento: new Date('04-18-1996'),
  },
  {
    nome: 'Marcio Pili',
    sexo: 'M',
    idade: '20',
    hobby: 'Animes',
    datanascimento: new Date('01-18-2001'),
  }
]

const nonExistingId = async () => {
  const developer = new Developer({ nome: 'Fernando Rawllers' })
  await developer.save()
  await developer.remove()

  return developer._id.toString()
}

const developersInDb = async () => {
  const developers = await Developer.find({})
  return developers.map(developer => developer.toJSON())
}

module.exports = {
  initialDevelopers, nonExistingId, developersInDb
}