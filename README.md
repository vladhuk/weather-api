# Weather API

MySQL server required.

## Scripts

### `yarn start-server`

Starts server.

See [postman collection](https://www.getpostman.com/collections/10ef140329c0beac8d9f).

### `yarn fetch-weather`

Retrieves data from [openweathermap.org](https://openweathermap.org). 

Check `.env` parameters "cities" and "country".

### `yarn migrate`

Runs database manually. It will be called automatically when executed `start-server` and `fetch-weather`

### `yarn lint`

Runs linter
