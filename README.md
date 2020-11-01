# Weather API

MySQL server required.

## Scripts

### `yarn start-server`

Starts server.

See postman collection: https://www.getpostman.com/collections/10ef140329c0beac8d9f

### `yarn fetch-weather`

Retrieves data from [openweathermap.org](https://openweathermap.org). Truncates related tables before fetching;

Check `.env` parameters "cities" and "country".

### `yarn add-test-data`

Adds test data to database

### `yarn migrate`

Runs database manually. It will be called automatically when executed `start-server`, `fetch-weather`, `add-test-data`

### `yarn lint`

Runs linter
