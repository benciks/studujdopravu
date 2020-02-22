# Studuj Dopravu

Studuj Dopravu is web app made for managing and administrating website about educational events that try to show people why it is a good idea to study transport fields in Slovakia. It contains latest news about the events as well as schools participating in this project.

## Getting Started

Here you can find instruction to get this project on your machine and run development version of it.

### Prerequisites

Before installing, you need:
* Docker
* docker-compose

### Installing

Clone this repository

```
git clone https://github.com/bencikdesign/studujdopravu.git
```

Change directory

```
cd studujdopravu
```

Clone .env.example and populate with editor of your choice

```
cp .env.example .env | nvim .env
```

Run docker-compose

```
docker-compose up -d
```

## Built With

* [Express.js](https://github.com/expressjs/express) - The web framework used
* [MariaDB](https://github.com/MariaDB/server) - The database used
* [Docker](https://www.docker.com/) - Docker

## Authors

* **Šimon Benčík** - [bencikdesign](https://github.com/bencikdesign)
