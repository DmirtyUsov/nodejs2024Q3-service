# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Install Docker Desktop](https://docs.docker.com/desktop/)

## Downloading

```
git clone git@github.com:DmirtyUsov/nodejs2024Q3-service.git
git checkout part-2
```

## Installing NPM modules

```
npm install
```

## Running application

Rename `.env.example` file
```
mv .env.example .env
```
Run container
```
docker compose up -d
```
First run will download two images from [DockerHub](https://hub.docker.com/repositories/dimausov) (104 and 95 MB)

It takes **15 seconds** for the container to start. Please be passionate about it   

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
## Vulnerabilities scanning
```
npm run scan
```
## Testing

To run all tests with authorization

```
npm run test:auth
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
