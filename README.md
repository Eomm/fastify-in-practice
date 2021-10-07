# fastify-in-practice
Fastify ha una solida architettura a plugin, è altamente performante, supporta Typescript e pensa alla developer experience per rendere meno arduo lo sviluppo a noi programmatori. Ma tutto questo cosa vuol dire in pratica? Scopriamolo insieme, creando delle API per la nostra startup. Saliremo poi in una macchina del tempo per vedere come evolve nel tempo il backend scritto con Fastify per capire i vantaggi che questo framework offre durante tutto il ciclo di vita di un software.


## Steps

Questo repository è utilizzato per il talk che puoi vedere su [YouTube](TODO).

La progressione di questa applicazione è suddivisa in 4 branch:

- `one-init`: lo stato iniziale, con l'essenziale per partire come questo README
- `one`: lo stato finiale della prima parte del talk
- `two-init`: lo stato consolidato di partenza per la seconda parte. Dovrebbe coincidere con `one`
- `two`: lo stato finale del talk

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

## Disclaimer

Questa applicazione è pensata per evidenziare i meccanismi di Fastify e non pretente di essere
in alcun modo un template base da cui ispirarsi per una reale applicazione di produzione.

Delle buone applicazioni a cui ispirarsi sono invece:

- [Covid Green App](https://github.com/covidgreen/covid-green-backend-api#readme)
- [Fastify example](https://github.com/delvedor/fastify-example#readme)
