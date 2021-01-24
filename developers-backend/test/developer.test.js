const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./helper')
const app = require('../app')
const api = supertest(app)

const Developer = require('../src/models/developer')

describe('when there is initially some developers saved', () => {
  beforeEach(async () => {
    await Developer.deleteMany({})

    const developerObjects = helper.initialDevelopers
      .map(developer => new Developer(developer))
    const promiseArray = developerObjects.map(developer => developer.save())
    await Promise.all(promiseArray)
  })

  test('developers are returned as json', async () => {
    await api
      .get('/api/developers')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('developers returns ', async () => {
    await api
      .get('/api/developers')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all developers are returned', async () => {
    const response = await api.get('/api/developers')

    expect(response.body.length).toBe(helper.initialDevelopers.length)
  })

  test('a specific developer is within the returned developers', async () => {
    const response = await api.get('/api/developers')

    const hobbies = response.body.map(r => r.hobby )
    expect(hobbies).toContain(
      'Animes'
    )
  })

  describe('viewing a specific developer', () => {

    test('succeeds with a valid id', async () => {
      const developersAtStart = await helper.developersInDb()

      const developerToView = { ...developersAtStart[0], datanascimento: developersAtStart[0].datanascimento.toJSON() }

      const resultDeveloper = await api
        .get(`/api/developers/${developerToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultDeveloper.body).toEqual(developerToView)
    })

    test('fails with statuscode 404 if developer does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/developers/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/developers/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new developer', () => {
    test('succeeds with valid data', async () => {
      const newDeveloper = {
        nome: 'Maria Angelina',
        sexo: 'M',
        idade: '15',
        hobby: 'Pescar',
        datanascimento: new Date('04-18-2006'),
      }

      await api
        .post('/api/developers')
        .send(newDeveloper)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const developersAtEnd = await helper.developersInDb()
      expect(developersAtEnd.length).toBe(helper.initialDevelopers.length + 1)

      const hobbies = developersAtEnd.map(n => n.hobby)
      expect(hobbies).toContain(
        'Pescar'
      )
    })

    test('fails with status code 400 if missing nome property', async () => {
      const newDeveloper = {
        idade: 15,
        datanascimento: new Date('01-10-1999')
      }

      await api
        .post('/api/developers')
        .send(newDeveloper)
        .expect(400)

      const developersAtEnd = await helper.developersInDb()

      expect(developersAtEnd.length).toBe(helper.initialDevelopers.length)
    })
  })

  describe('deletion of a developer', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const developersAtStart = await helper.developersInDb()
      const developerToDelete = developersAtStart[0]

      await api
        .delete(`/api/developers/${developerToDelete.id}`)
        .expect(204)

      const developersAtEnd = await helper.developersInDb()

      expect(developersAtEnd.length).toBe(
        helper.initialDevelopers.length - 1
      )

      const nomes = developersAtEnd.map(r => r.nome)

      expect(nomes).not.toContain(developerToDelete.nome)
    })
  })



  describe('deletion of a developer', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const developersAtStart = await helper.developersInDb()
      const developerToUpdate = developersAtStart[0]

      await api
        .put(`/api/developers/${developerToUpdate.id}`)
        .send({ ...developerToUpdate, hobby: 'Floricultura' })
        .expect(200)

      const developersAtEnd = await helper.developersInDb()

      const hobbies = developersAtEnd.map(r => r.hobby)

      expect(hobbies).not.toContain(developerToUpdate.hobby)
      expect(hobbies).toContain('Floricultura')
    })
  })


  describe('paginate', () => {

    test('succeeds with a page and limit set', async () => {

      const developers = await api
        .get('/api/developers?page=0&limit=1')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(developers.body.length).toEqual(1)
    })

    test('return all developers when a not valid pagination parameter', async () => {

      const developers = await api
        .get('/api/developers?page=0&limit=AS')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(developers.body.length).toEqual(2)
    })

  })

  describe('querystring', () => {

    test('succeeds with a age filter equals 21 years', async () => {

      const developers = await helper.developersInDb()

      const response = await api
        .get(`/api/developers?idade=${developers[0].idade}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toEqual(1)
      expect(response.body[0]).toEqual({... developers[0], datanascimento: developers[0].datanascimento.toJSON() })
    })

    test('filter by hobby developers', async () => {

      const developerToFilter = await helper.developersInDb()

      const developers = await api
        .get(`/api/developers?hobby=${developerToFilter[0].hobby}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(developers.body.length).toEqual(1)
      expect(developers.body[0].hobby).toEqual(developerToFilter[0].hobby)
    })

    test('invalid querystring return get all', async () => {

      const developers = await api
        .get('/api/developers?testing=null')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(developers.body.length).toEqual(2)

    })

    test('date querystring on datanascimento filter', async () => {

      const developers = await api
        .get('/api/developers?datanascimento=<2000-01-01')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(developers.body.length).toEqual(1)

    })

  })

})


afterAll(() => {
  mongoose.connection.close()
})