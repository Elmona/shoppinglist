const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')

const server = request.agent('http://localhost:3001')

// Send nothing except failure
describe('POST /signup', () => {
  it('Responds with error', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({})
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(401)
        done()
      })
  })

  // Everything okey except it to work.
  it('Responds with 200', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'test',
        password: 'testarlite',
        email: 'root@localhost'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  // Duplicate user should respond with error.
  it('Responds with error', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'test',
        password: 'testarlite',
        email: 'root@localhost'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.text).to.equal(`{"error":"Username already taken"}`)
        done()
      })
  })

  // Test to short username.
  it('Responds with error', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        username: 't',
        password: 'testarlite',
        email: 'root@localhost'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.text).to.equal(`{"error":"Username may only contain numbers, lowercase and uppercase letters. It must be between 3 to 10 characters long."}`)
        done()
      })
  })

  // Test username with wrong characters.
  it('Responds with error', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        username: 't45%&',
        password: 'testarlite',
        email: 'root@localhost'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.text).to.equal(`{"error":"Username may only contain numbers, lowercase and uppercase letters. It must be between 3 to 10 characters long."}`)
        done()
      })
  })

  // Test username with to short password
  it('Responds with error', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        username: '123456',
        password: 't',
        email: 'root@localhost'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.text).to.equal(`{"error":"Password is to short minimum length is 8 characters long"}`)
        done()
      })
  })

  // Test with wrong input
  it('Responds with error', done => {
    server
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        usernasdfme: '123456',
        passwosdfrd: 't',
        emasdfil: 'root@localhost'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.text).to.equal(`{"error":"Invalid input"}`)
        done()
      })
  })
})
