const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')

const server = request.agent('http://localhost:3000')

describe('GET /', () => {
  it('GET', done => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(200)
        done()
      })
  })
})
