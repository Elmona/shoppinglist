const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')

const server = request.agent('http://localhost:3001')

describe('POST /login', () => {
  it('Responds with Token', done => {
    server
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'Emil',
        password: 'test'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Responds with Error', done => {
    server
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'Emilar',
        password: 'testar'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(401)
        done()
      })
  })

  it('Responds with Error', done => {
    server
      .post('/login')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(401)
        done()
      })
  })
})
