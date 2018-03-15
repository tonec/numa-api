import request from 'supertest'
import { expect } from 'chai'
import config from '../../../config'
import api from '../../'

const path = config.basePath

describe('ROUTE: /api/convert/toLatin', () => {
  it('A GET to /api/convert/toLatin should be a bad request without a val in query', done => {
    request(api)
      .get(path('/convert/toLatin'))
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) {
          return done(new Error(`Supertest has encountered an error: ${err}`))
        }
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('BadRequest')
        expect(res.body.message).to.equal(
          'No value to convert.'
        )
        done()
      })
  })

  it('A GET to /api/convert/toLatin should be a bad request if the val in query is not a number', done => {
    request(api)
      .get(path('/convert/toLatin?val=1b1'))
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) {
          return done(new Error(`Supertest has encountered an error: ${err}`))
        }
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('BadRequest')
        expect(res.body.message).to.equal(
          'The value provided is not a number.'
        )
        done()
      })
  })

  it('A GET to /api/convert/toLatin should return the correct response if a valid val is provided', done => {
    request(api)
      .get(path('/convert/toLatin?val=111'))
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) {
          return done(new Error(`Supertest has encountered an error: ${err}`))
        }
        expect(res.status).to.equal(200)
        expect(res.body.originalValue).to.equal('111')
        expect(res.body.conversionValue).to.equal('CXI')
        done()
      })
  })
})

describe('ROUTE: /api/convert/fromLatin', () => {
  it('A GET to /api/convert/fromLatin should be a bad request without a val in query', done => {
    request(api)
      .get(path('/convert/fromLatin'))
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) {
          return done(new Error(`Supertest has encountered an error: ${err}`))
        }
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('BadRequest')
        expect(res.body.message).to.equal(
          'No value to convert.'
        )
        done()
      })
  })

  it('A GET to /api/convert/fromLatin should be a bad request if the val in query is not a valid numeral', done => {
    request(api)
      .get(path('/convert/fromLatin?val=1b1'))
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) {
          return done(new Error(`Supertest has encountered an error: ${err}`))
        }
        expect(res.status).to.equal(400)
        expect(res.body.code).to.equal('BadRequest')
        expect(res.body.message).to.equal(
          'The value provided is not a roman numeral.'
        )
        done()
      })
  })

  it('A GET to /api/convert/fromLatin should return the correct response if a valid val is provided', done => {
    request(api)
      .get(path('/convert/fromLatin?val=CXI'))
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) {
          return done(new Error(`Supertest has encountered an error: ${err}`))
        }
        expect(res.status).to.equal(200)
        expect(res.body.originalValue).to.equal('CXI')
        expect(res.body.conversionValue).to.equal('111')
        done()
      })
  })
})
