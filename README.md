# Nonprofit Exchange Hub (working name)

## Description 
Platform for non-profits and citizens to collaborate in a giving economy.

Primary tech stack: PostgreSQL, Nest, and React

## Installation and Setup

1. Setup PostgreSQL Database via a Docker container
    * Docker Installation - Follow instuctions for your specific platform:
        * [Docker](https://docs.docker.com/get-docker/)
        * Confirm installation of Docker (version and build may differ)
        ```
        $ docker -v
        Docker version 1.7.0, build 0baf609
        ```
        * [Docker Compose](https://docs.docker.com/compose/install/)
        * Confirm installation of Docker Compose (version and build may differ)
        ```
        $ docker-compose --version
        docker-compose version 1.29.2, build 1110ad01
        ```
2. Download or [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) repository.
4. Install required dependencies by running `npm install` from within `/server` directory and from the `/client` directory.
3. Environmental variables required in `/server` directory - defaults provided can be changed out at will:

```
    PORT=3001
    DATABASE_HOST=localhost
    DATABASE_PORT=8080
    DATABASE_USER=postgres
    DATABASE_PASSWORD=your_password
    DATABASE_DB=test_db
    BCRYPT_WORK_FACTOR=10
```

## Startup

1. With docker and docker-compose installed, ensure the specified `DATABASE_PORT` is free and run `npm run start:dev:db` from `/server` directory to start up PostgreSQL docker container.
    * Terminal should show a successful start of the docker container, but this can be confirmed by running `docker ps` in terminal to view all running containers. One should match the name of `container_name` from `docker-compose.yml` file
2. To start Nest backend in watch mode: From `/server` directory, run `npm run start:dev`.
3. To start up React frontend: From `/client` directory, run `npm start`. A browser page should start up automatically. If not, visit `localhost:3000`.

## Test
Most tests are still in development.
### Backend
From the `/server` directory.
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### Frontend
From the `/client` directory.
```bash
# unit tests
$ npm run test
```

## Support

NEH is an MIT-licensed open source project. If you'd like to join us, please [read more here](https://www.democracylab.org/projects/486).

## License

NEH is [MIT licensed](LICENSE).

