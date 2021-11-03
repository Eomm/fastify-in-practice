# fastify-in-practice

Welcome to this CRUD application.
Read the blog post at [https://backend.cafe//how-to-use-fastify-and-mongodb](https://backend.cafe//how-to-use-fastify-and-mongodb) for more information:!


## How to use

To start the project you need to run the following command:

```
# checkout the project
npm install
npm run mongo:start
npm run dev
```

To try the API you can use the following command:

```
make post text="hello world"
make get
make put id=61742e31dda30cab65317784
make delete id=61742e31dda30cab65317784
```


## How it has started

This repo has been created to create a talk about fastify at the Code to Code 2021 Italian Conference.

- Video on [YouTube](https://www.youtube.com/watch?v=WBvzJeWgylU&t=3833s) (Lang: 🇮🇹)
- [Slides](https://docs.google.com/presentation/d/1bpKWlrkdYaWQElMH3z9pkZtRgER7y9uCIpgpW6_rzM4/edit) from the talk (Lang: 🇮🇹)


### The talk incipit 🇮🇹

Fastify ha una solida architettura a plugin, è altamente performante, supporta Typescript e pensa alla developer experience per rendere meno arduo lo sviluppo a noi programmatori. Ma tutto questo cosa vuol dire in pratica? Scopriamolo insieme, creando delle API per la nostra startup. Saliremo poi in una macchina del tempo per vedere come evolve nel tempo il backend scritto con Fastify per capire i vantaggi che questo framework offre durante tutto il ciclo di vita di un software.


#### Talk summary 🇮🇹

La progressione di questa applicazione è suddivisa in branch:

- `one-init`: lo stato iniziale, con l'essenziale per partire come questo README
- `two-init`: lo stato consolidato di partenza per la seconda parte. Dovrebbe coincidere con `one`
- `main`: lo stato finale del talk

Per provare le chiamate ai servizi senza lasciare la shell, è possibile richiamare il `Makefile`:

```sh
# make <comando> <param=valore>
make post text="Fare la spesa"
make get
```

#### Step `one`

- Preparazione del progetto
- Logging
- Creazione delle routes
- Connessione al database
- Validazione input
- Configurazione applicazione

```sh
mkdir fastify-in-practice
cd fastify-in-practice
npm init --yes
npm install fastify fastify-mongodb
npm install standard pino-pretty -D
code server.js
```

#### Step `two`

- Test legacy
- Estrai plugin
- Siblings plugin
- Aggiungi autenticazione

```sh
npm install tap mongo-clean -D
npm install fastify-basic-auth
```

## Further reading

You may find inspiration on the following projects:

- [Covid Green App](https://github.com/covidgreen/covid-green-backend-api#readme)
- [Fastify example](https://github.com/delvedor/fastify-example#readme)
