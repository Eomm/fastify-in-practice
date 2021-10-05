# fastify-in-practice
Fastify ha una solida architettura a plugin, è altamente performante, supporta Typescript e pensa alla developer experience per rendere meno arduo lo sviluppo a noi programmatori. Ma tutto questo cosa vuol dire in pratica? Scopriamolo insieme, creando delle API per la nostra startup. Saliremo poi in una macchina del tempo per vedere come evolve nel tempo il backend scritto con Fastify per capire i vantaggi che questo framework offre durante tutto il ciclo di vita di un software.


## Steps

### Branch `one`

- Preparazione del progetto
- Creazione delle routes
- Connessione al database
- Validazione input
- Configurazione applicazione
- Logging

```sh
mkdir fastify-in-practice
cd fastify-in-practice
npm init --yes
npm install fastify
npm install standard -D
npm install pino-pretty -D
code server.js
```

### Branch `two`

- Test legacy
- Estrai plugin
- Siblings plugin
- Aggiungi autenticazione

```sh
npm install tap -D
npm install mongo-clean -D
npm install fastify-basic-auth
```
