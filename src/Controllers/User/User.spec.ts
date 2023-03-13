// import { describe, expect, it } from 'vitest'
// import request from 'supertest'
// import { config } from 'dotenv'
// import { sign } from 'jsonwebtoken'
// import crypto from 'crypto'
// config()

// interface ITestUser {
//   fakeId?: number
//   firstName?: string,
//   lastName?: string,
//   birthDate?: string,
//   city?: string,
//   country?: string,
//   email?: string,
//   password?: string,
//   confirmPassword?: string,
//   passwordChangedAt: Date,
//   passwordResetToken: string,
//   passwordResetExpires: number
// }

// class MyTestFeatures {
//   public getRandomInt (): number {
//     return Math.floor(Math.random() * 100001) // number between 0 and 10000
//   }

//   public getNowDate (): string {
//     const date = new Date()
//     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
//   }

//   public createTestToken (id: number): string {
//     return sign({ id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN
//     })
//   }

//   public createPasswordResetToken (data: ITestUser): string {
//     const resetToken = crypto.randomBytes(32).toString('hex')

//     data.passwordResetToken = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex')

//     data.passwordResetExpires = Date.now() + 10 * 60 * 1000

//     return resetToken
//   }
// }

// describe('User', async () => {
//   const testFeatures = new MyTestFeatures()
//   const stringDate = testFeatures.getNowDate()
//   const randomize = testFeatures.getRandomInt()
//   const url = 'http://localhost:8083'
//   const userRoute = '/api/v1/users'
//   let authToken = ''

//   // on the its, I sent the completed reqBody to show that even if a random property would be sent, nothing happens and the application gets just the correct properties, does not getting "trash"

//   const reqBody: ITestUser = {
//     fakeId: randomize,
//     firstName: `Rafael${randomize}`,
//     lastName: `Sobrinho${randomize}`,
//     birthDate: stringDate,
//     city: 'Campo Grande',
//     country: 'Brazil',
//     email: `emailtope${randomize}@gmail.com`,
//     password: 'Senha123',
//     confirmPassword: 'Senha123',
//     passwordChangedAt: new Date(),
//     passwordResetToken: 'fakeEncryptToken',
//     passwordResetExpires: Date.now() + 10 * 60 * 1000

//   }

//   const fakeResetPassToken = testFeatures.createPasswordResetToken(reqBody)

//   it('should be able to create a user and logIn him/her', async () => {
//     const res = await request(url).post(userRoute + '/signUp').send(reqBody)
//     expect(res.status).toBe(200)
//     expect(res.body.message).toBe('User created successfully')
//   })

//   it('should be able to logIn an existing user', async () => {
//     const res = await request(url).post(userRoute + '/signIn').send(reqBody)

//     const token = testFeatures.createTestToken(randomize)
//     res.headers.authorization = `Bearer ${token}`

//     authToken = res.body.token

//     expect(res.status).toBe(200)
//     expect(res.body.message).toBe('User logged in successfully')
//   })

//   it('should be able to update your data already logged in', async () => {
//     const res = await request(url).patch(userRoute + '/').send(reqBody).set('Authorization', `Bearer ${authToken}`)

//     expect(res.status).toBe(200)
//     expect(res.body.message).toBe('User data updated successfully')
//   })

//   it('should be able to delete your data already logged in', async () => {
//     const res = await request(url).delete(userRoute + '/').send(reqBody).set('Authorization', `Bearer ${authToken}`)

//     expect(res.status).toBe(204)
//   })

//   // not working yet, both forgot and reset pass
//   // it('should be able to forgot the pass, sent an email with the link to reset', async () => {
//   //   const res = await request(url).post(userRoute + '/forgotPassword/fakeResetPassToken').send(reqBody)

//   //   console.log(reqBody.email)

//   //   // expect(res.status).toBe(200)
//   // })
//   // it('should reset your password with the link sent on your email', async () => {
//   //   const res = await request(url).post(userRoute + `/resetPassword/${fakeResetPassToken}`)

//   //   expect(res.status).toBe(200)
//   // })
// })
