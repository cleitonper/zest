# Zest

A NestJS API

[![Build Status](https://travis-ci.org/cleitonper/zest.svg?branch=master)](https://travis-ci.org/cleitonper/zest)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=cleitonper_zest&metric=alert_status)](https://sonarcloud.io/dashboard?id=cleitonper_zest)


## Environment

Rename the `.env.example` file to `.env` and set all avaliable fields.

```bash
# .env file
PORT=3000

MONGODB_URI='mongodb://127.0.0.1/zest'

EMAIL_PORT=2525
EMAIL_HOST='smtp.example.io'
EMAIL_USER='zest@zest.com'
EMAIL_PASS='supersecretpw'
EMAIL_NAME='Zest' # This will be the sender name
EMAIL_ADDR='no-reply@zest.com' # This will be the sender email
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
