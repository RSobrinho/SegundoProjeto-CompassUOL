# Project Title

This is a planner where you can organize your week and tasks the way you want it.

## Badges

[![Npm package version](https://badgen.net/npm/v/express)](https://npmjs.com/package/express)
[![GitHub contributors](https://img.shields.io/badge/github-gray?style=plastic&logo=github)](https://GitHub.com/RSobrinho/SegundoProjeto-CompassUOL/graphs/contributors/)
[![TypeScript](https://img.shields.io/badge/typescript-gray?style=plastic&logo=typescript)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/docker-gray?style=plastic&logo=docker)](https://https://docker.com/)
[![Npm](https://img.shields.io/badge/npm-gray?style=plastic&logo=npm)](https://https://npmjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-gray?style=plastic&logo=mongodb)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/swagger-gray?style=plastic&logo=swagger)](https://swagger.io/)
[![Vitest](https://img.shields.io/badge/vitest-gray?style=plastic&logo=vitest)](https://vitest.dev/)
[![Eslint](https://img.shields.io/badge/eslint-gray?style=plastic&logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/prettier-gray?style=plastic&logo=prettier)](https://prettier.io/)

## Content

<!--ts-->

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [SignUp user](#signup-user)
  - [SignIn user](#signin-user)
  - [Update user data](#update-user-data)
  - [Delete user account](#delete-user-account)
  - [Forgot password](#forgot-password)
  - [Reset password](#reset-password)
  - [Create new event](#create-new-event)
  - [Return all events](#return-all-events)
  - [Return event by id](#return-event-by-id)
  - [Return all weekday events](#return-all-weekday-events)
  - [Return events with date range filter](#return-events-with-date-range-filter)
  - [Delete event by id](#delete-event-by-id)
  - [Delete event by weekday](#delete-event-by-weekday)
- [Features](#features)
- [Specifications](#specifications)

<!--te-->

# Installation

First you will need to install Git(https://git-scm.com). Then you can follow this steps(https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to clone this repository.

# Usage

To run all this commands, you'll need to have npm and nodeJs installed. You can see how to install them here(https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

In the project directory, you can run:

### `npm i`

to install all dependencies. And after that, run:

### `npm start`

to start the app. The app will start on port 8080.

You can also run:

### `npm run build`

to compile the ts files to js.

# API Documentation

## SignUp user

```http
  POST /api/v1/users/signup
```

#### Input

```json
{
  "firstName": "Gabriela",
  "lastName": "Medeiros",
  "birthDate": "2004-05-09",
  "city": "New York",
  "country": "USA",
  "email": "gabi@teste.com",
  "password": "123",
  "confirmPassword": "123"
}
```

| Parâmetro         | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `firstName`       | `string` | **Required**. |
| `lastName`        | `string` | **Required**. |
| `birthDate`       | `date`   | **Required**. |
| `city`            | `string` | **Required**. |
| `country`         | `string` | **Required**. |
| `email`           | `string` | **Required**. |
| `password`        | `string` | **Required**. |
| `confirmPassword` | `string` | **Required**. |

## SignIn user

```http
  POST /api/v1/users/signin
```

#### Input

```json
{
  "email": "gabi@teste.com",
  "password": "123"
}
```

| Parâmetro  | Tipo     | Descrição     |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

## Update user data

```http
  PATCH /api/v1/users/
```

#### Input

```json
{
  "firstName": "Gabriela",
  "lastName": "Medeiros",
  "birthDate": "2004-05-09",
  "city": "Campo Grande",
  "country": "Brazil",
  "email": "gabriela@teste.com"
}
```

| Parâmetro   | Tipo     | Descrição    |
| :---------- | :------- | :----------- |
| `firstName` | `string` | **Optional** |
| `lastName`  | `string` | **Optional** |
| `birthDate` | `date`   | **Optional** |
| `city`      | `string` | **Optional** |
| `country`   | `string` | **Optional** |
| `email`     | `string` | **Optional** |

## Delete user account

```http
  DELETE /api/v1/users/
```

## Forgot password

```http
  POST /api/v1/users/forgotPassword
```

#### Input

```json
{
  "email": "gabriela@teste.com"
}
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `email`   | `string` | **Required**. |

## Reset password

```http
  POST /api/v1/users/${resetToken}
```

#### Input

```json
{
  "password": "12345",
  "confirmPassword": "12345"
}
```

| Parâmetro         | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `password`        | `string` | **Required**. |
| `confirmPassword` | `string` | **Required**. |

## Create new event

```http
  POST /api/v1/events
```

#### Input:

```json
{
  "description": "event description",
  "dayOfWeek": "friday",
  "dateTime": "2023-05-12T21:28:12Z"
}
```

| Parâmetro     | Tipo     | Descrição                                                                        |
| :------------ | :------- | :------------------------------------------------------------------------------- |
| `description` | `string` | **Required**.                                                                    |
| `dayOfWeek`   | `string` | **Required**. (sunday, monday, tuesday, wednesday, thursday, friday or saturday) |
| `dateTime`    | `date`   | **Required**.                                                                    |

## Return all events

```http
  GET /api/v1/events
```

## Return event by id

```http
  GET /api/v1/events/${id}
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

## Return all weekday events

```http
  GET /api/v1/events?dayOfWeek={dayOfTheWeek}
```

| Parâmetro      | Tipo     | Descrição                                                                        |
| :------------- | :------- | :------------------------------------------------------------------------------- |
| `dayOfTheWeek` | `string` | **Required**. (sunday, monday, tuesday, wednesday, thursday, friday or saturday) |

## Return events with date range filter

```http
  GET /api/v1/events/filterByDate?startDate={startDate}&endDate={endDate}
```

| Parâmetro   | Tipo   | Descrição                                |
| :---------- | :----- | :--------------------------------------- |
| `startDate` | `Date` | **Optional**. (Ex: 2023-05-12T21:28:12Z) |
| `endDate`   | `Date` | **Optional**. (Ex: 2023-05-12T21:28:12Z) |

## Delete event by id

```http
  DELETE /api/v1/events/${id}
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

## Delete event by weekday

```http
  DELETE /api/v1/events?dayOfWeek={dayOfTheWeek}
```

| Parâmetro      | Tipo     | Descrição                                                                        |
| :------------- | :------- | :------------------------------------------------------------------------------- |
| `dayOfTheWeek` | `string` | **Required**. (sunday, monday, tuesday, wednesday, thursday, friday or saturday) |

# Features

- [x] User sign up Route
- [x] User sign in Route
- [x] Update user data Route
- [x] Delete user account Route
- [x] Forgot password Route
- [x] Reset Password Route
- [x] Create new event Route
- [x] Get all events Route
- [x] Get event by id Route
- [x] Get event by weekday Route
- [x] Get events with date range filter Route
- [x] Delete event by id Route
- [x] Delete event by weekday Route

# Specifications

### Get Events by Weekday Route

- In this route the weekday is passed as a query param, there's a validation to see if there is a query param, otherwise it will call the getAll method.

### Get Events with Date Range Filter Route

- In this route, two dates can be passed by the query params:
- startDate: Will get the events that happens after of durign that dateTime
- endDate: Will get the events that happens before of durign that dateTime
- Both startDate and endDate are optional, meaning you can pass one or both of the params in the query

## Deploy

- It was deployed using AWS EC2
- URL: http://44.203.14.175:3000

```code
  //start server
  pm2 start deploy_planner

  //stop server
  pm2 stop deploy_planner

  //restart server
  pm2 restart deploy_planner
```
