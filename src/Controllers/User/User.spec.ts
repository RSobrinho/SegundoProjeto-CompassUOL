import { describe, expect, it } from 'vitest'
import request from 'supertest'
import UserRouter from '../../Routes/UserRouter'
import { signUpUserController } from './SignUpUserController'
import { Router, Request, Response, NextFunction } from 'express'
import App from '../../App'
import { asyncHandler } from '../../Error/Handler'
import { config } from 'dotenv'
config()
describe('SignUp User Controller', async () => {
  const url = 'http://localhost:8083'
  const signUpRoute = '/api/v1/users/signUp'

  const reqBody = {
    firstName: 'Rafael',
    lastName: 'Sobrinho',
    birthDate: '2004-07-03',
    city: 'Campo Grande',
    country: 'Brazil',
    email: 'emailnormaltopzera@gmail.com',
    password: 'Rafael123',
    confirmPassword: 'Rafael123'
  }

  it('should be able to create a user and logIn him/her', async () => {
    const res = await request(url).post(signUpRoute).send(reqBody)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('User created successfully')
  })
})

describe('SignIn User Controller', async () => {
  const url = 'http://localhost:8083'
  const signUpRoute = '/api/v1/users/signIn'

  const reqBody = {
    firstName: 'Rafael',
    lastName: 'Sobrinho',
    birthDate: '2004-07-03',
    city: 'Campo Grande',
    country: 'Brazil',
    email: 'emailnormaltopzera@gmail.com',
    password: 'Rafael123',
    confirmPassword: 'Rafael123'
  }

  it('should be able to logIn an existing user', async () => {
    const res = await request(url).post(signUpRoute).send(reqBody)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('User logged in successfully')
  })
})
