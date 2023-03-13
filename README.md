This is an exemple of the README.md

# Project Title

Project description

## Content
<!--ts-->
   * [Installation](#installation)
   * [Usage](#usage)
   * [API Documentation](#api-documentation)
      * [Return all events](#return-all-events)
      * [Return event by id](#return-event-by-id)
      * [Return all weekday events](#return-all-weekday-events)
      * [Create new event](#create-new-event)
      * [SignUp user](#signup-user)
      * [SignIn user](#signin-user)
      * [Delete event by id](#delete-event-by-id)
      * [Delete event by weekday](#delete-event-by-weekday)
   * [Features](#features)
   * [Specifications](#specifications)
   
<!--te-->

Installation
============
First you will need to install Git(https://git-scm.com). Then you can follow this steps(https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to clone this repository.


Usage
=====

To run all this commands, you'll need to have npm and nodeJs installed. You can see how to install them here(https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

In the project directory, you can run:

### `npm i`

to install all dependencies. And after that, run:

### `npm start`

to start the app. The app will start on port 3000.


API Documentation
=================

Return all events
-----------------

```http
  GET /api/v1/events
```

Return event by id
------------------

```http
  GET /api/v1/events/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. |


Return all weekday events
-------------------------

```http
  GET /api/v1/events?weekday={dayOfTheWeek}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `dayOfTheWeek`      | `string` | **Required**. (sunday, monday, tuesday, wednesday, thursday, friday or saturday) |

Create new event
----------------

```http
  POST /api/v1/events
```
#### Input:

```json
{
  "description": "event description",
  "dateTime": "2023-05-12T21:28:12Z",
  "createdAt": "2023-04-15T21:28:12Z"
}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `description`      | `string` | **Required**. |
| `dateTime`      | `string` | **Required**. |
| `createdAt`      | `string` | **Required**. |

SignUp user
-----------

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
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `firstName`      | `string` | **Required**. |
| `lastName`      | `string` | **Required**. |
| `birthDate`      | `string` | **Required**. |
| `city`      | `string` | **Required**. |
| `country`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `password`      | `string` | **Required**. |
| `confirmPassword`      | `string` | **Required**. |

SignIn user
-----------

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
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Required**. |
| `password`      | `string` | **Required**. |

Delete event by id
------------------

```http
  DELETE /api/v1/events/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. |

Delete event by weekday
-----------------------

```http
  DELETE /api/v1/events?weekday={dayOfTheWeek}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `dayOfTheWeek`      | `string` | **Required**. (sunday, monday, tuesday, wednesday, thursday, friday or saturday) |

Features
========

- [x] Get all events Route
- [x] Get event by id Route
- [x] Get event by weekday Route
- [x] Create new event Route
- [x] User sign up Route
- [x] User sign in Route
- [x] Delete event by id Route
- [x] Delete event by weekday Route


Specifications
==============
### Get Events by Weekday Route 
- In this route the weekday is passed as a query param, there's a validation to see if there is a query param, otherwise it will call the getAll method. 
- The response brings all upcoming events on that weekday.
### Create New Event Route
- UUID v4 was used because it generates a random uuid

## Deploy
- It was deployed using AWS EC2 
- URL: http://44.203.14.175:3000/
```code
  //start server
  pm2 start deploy_planner
  
  //stop server
  pm2 stop deploy_planner
  
  //restart server
  pm2 restart deploy_planner
```