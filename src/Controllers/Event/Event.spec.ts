import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { config } from 'dotenv'
import crypto from 'crypto'
config()

interface ITestEvent {
  description?: string,
  dayOfWeek?: string,
  createdAt: Date,
  user: string,
  dateTime: string
}

class MyTestFeatures {
  public getRandomInt (): number {
    return Math.floor(Math.random() * 100001) // number between 0 and 10000
  }

  public getRandomDate (): string {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  public randomDate (start = new Date('2020-01-01'), end = new Date()) {
    return new Date(+start + Math.random() * ((end as any) - (start as any)))
  }
}

describe('User', async () => {
  const testFeatures = new MyTestFeatures()
  const randomize = testFeatures.getRandomInt()
  const url = 'http://localhost:8083'
  const userRoute = '/api/v1/users'
  const eventRoute = '/api/v1/events'
  let authToken = ''

  // on the its, I sent the completed reqBody to show that even if a random property would be sent, nothing happens and the application gets just the correct properties, does not getting "trash"

  const reqBody: ITestEvent = {
    description: 'A very good desc',
    dayOfWeek: 'sunday',
    createdAt: new Date(),
    user: '640f39b715cb70cd1a3a5168',
    dateTime: testFeatures.getRandomDate()

  }

  beforeAll(async () => {
    const res = await request(url).post(userRoute + '/signIn').send({ email: 'testetopttt@gmail.com', password: '123' })

    authToken = res.body.token

    expect(res.status).toBe(200)
  })

  it('should be able to create an event', async () => {
    const res = await request(url).post(eventRoute + '/').send(reqBody).set('Authorization', `Bearer ${authToken}`)
    expect(res.status).toBe(201)
  })
  // not finished
})
