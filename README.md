# Studuj Dopravu

Studuj Dopravu is web app made for managing and administrating website about educational events that try to show people why it is a good idea to study transport fields in Slovakia. It contains latest news about the events as well as schools participating in this project.

## Getting Started

Here you can find instruction to get this project on your machine and run development version of it.

### Prerequisites

Before installing, you need:
* Node.js v12.14.1
* npm v6.13.4 or other dependency manager like [yarn](https://github.com/yarnpkg/yarn)
* MariaDB v10.4.11 or MySQL equivalent

### Installing

Clone this repository

```
git clone https://github.com/bencikdesign/studujdopravu.git
```

Change directory

```
cd studujdopravu
```

Install dependencies

```
npm install
```

Compile assets using laravel-mix

```
npm run mix
```
Or using `npm run watch` To compile on every change in `./src` directory.

You may want to create a copy of `env.example` and populate it

```
cp .env.example .env
```

Run development server using nodemon

```
npm run dev
```
Use `npm run dev-legacy` if you are using WSL2.

## Built With

* [Express.js](https://github.com/expressjs/express) - The web framework used
* [MariaDB](https://github.com/MariaDB/server) - The database used

## Authors

* **Šimon Benčík** - [bencikdesign](https://github.com/bencikdesign)
