# Landing Page Aziendale

Template statico per una landing page aziendale realizzato con HTML, CSS e JavaScript vanilla.

Il progetto è pensato per essere leggero, facile da personalizzare e semplice da pubblicare anche su hosting condivisi come Aruba Linux.

## Caratteristiche

- navbar desktop con ancore alle sezioni
- menu mobile a tendina con apertura e chiusura animate
- scroll fluido tra le sezioni
- evidenziazione del link attivo sia su desktop sia su mobile
- form contatti con invio tramite FormSubmit
- sezione mappa con Google Maps in `iframe`
- footer con contatti, social e collegamenti legali
- file `.htaccess` per redirect HTTPS e hardening base

## Struttura del progetto

```text
Landing_1/
|-- .htaccess
|-- index.html
|-- README.md
|-- images/
|   |-- logo.png
|   |-- logo_footer.png
|   `-- social/
|       |-- icon-facebook.png
|       |-- icon-instagram.png
|       `-- icon-whatsapp.png
|-- scripts/
|   |-- effectsScrolling.js
|   |-- main.js
|   `-- notifyForm.js
`-- styles/
    |-- style.css
    `-- style-mobile.css
```

## Tecnologie usate

- HTML5
- CSS3
- JavaScript vanilla
- FormSubmit per il form contatti
- Google Maps Embed per la mappa

Non sono richieste dipendenze, package manager o build step.

## Avvio in locale

Puoi aprire direttamente `index.html` nel browser.

Se vuoi simulare un ambiente più vicino alla pubblicazione, puoi usare un server statico locale a tua scelta, ma non è obbligatorio.

## File principali

### `index.html`

Contiene tutta la struttura della pagina:

- navbar desktop
- menu mobile
- sezioni `about`, `services`, `contacts`, `location`
- form contatti
- mappa embedded
- footer

### `styles/style.css`

Gestisce lo stile principale desktop e la base comune del progetto:

- layout generale
- navbar fissa
- sezioni a piena altezza
- stile del form
- footer
- dimensionamento mappa

### `styles/style-mobile.css`

Contiene le regole responsive per schermi piccoli:

- nasconde la navbar desktop
- mostra il bottone del menu mobile
- anima apertura e chiusura del menu
- adatta form, footer e iframe ai dispositivi piccoli

### `scripts/main.js`

Gestisce:

- stato iniziale della pagina
- evidenziazione iniziale del link `#about`
- apertura e chiusura del menu mobile
- cambio icona del pulsante mobile
- chiusura del menu al click su un link mobile

### `scripts/effectsScrolling.js`

Gestisce:

- click sui link di navigazione
- sincronizzazione della classe `active`
- scroll animato alle sezioni
- compensazione dell'altezza della navbar

### `scripts/notifyForm.js`

Gestisce:

- submit asincrono del form
- invio dati a FormSubmit
- reset del form
- messaggio temporaneo di conferma
- gestione dell'errore di invio

## Cosa personalizzare prima della pubblicazione

### Dati base della pagina

In `index.html` aggiorna:

- `<title>`
- `<meta name="description">`
- favicon
- nome azienda
- testi delle sezioni

### Navbar e contenuti

Aggiorna i testi delle sezioni:

- `Chi siamo`
- `Cosa facciamo`
- `Contattaci`
- `Dove trovarci`

### Form contatti

Nel form aggiorna almeno:

- l'email nell'attributo `action` di FormSubmit
- il valore di `_subject`

Controlla anche che:

- i campi richiesti siano quelli desiderati
- i pattern di validazione siano coerenti con il tuo uso reale

### Mappa

Sostituisci il valore di `src` dell'`iframe` con la posizione reale dell'attività.

### Footer

Aggiorna:

- denominazione azienda
- P.IVA
- capitale sociale
- indirizzo o sede
- numeri di telefono
- email
- link social
- link privacy e cookie

## Pubblicazione su Aruba

Per una pubblicazione classica su Aruba Linux:

1. Carica il contenuto del progetto nella root pubblica del dominio.
2. Verifica che `index.html` sia nella cartella principale del sito.
3. Assicurati che il certificato SSL del dominio sia attivo.
4. Controlla che il file `.htaccess` venga letto correttamente dal server.
5. Dopo il deploy, testa sito, form, menu mobile e mappa direttamente online.

### Nota importante su `.htaccess`

Il progetto include un file `.htaccess` con:

- redirect HTTP -> HTTPS
- disabilitazione dell'index listing
- alcuni header di sicurezza

Dopo la pubblicazione conviene verificare nel browser, tramite DevTools o strumenti online, che:

- il redirect HTTPS funzioni
- gli header siano davvero presenti nella risposta

Su hosting condivisi alcune direttive possono dipendere dai moduli attivi lato server.

## Checklist pre-pubblicazione

- sostituiti tutti i testi placeholder
- sostituiti logo e immagini definitive
- sistemato il path della favicon
- aggiornati contatti, email e social
- verificato l'invio del form
- verificata la resa su mobile
- verificato il comportamento del menu mobile
- verificato lo scroll dei link di navigazione
- verificato il corretto caricamento della mappa
- create o collegate le pagine privacy e cookie

## Sicurezza

Il progetto è una landing statica, quindi la superficie d'attacco è ridotta rispetto a un'applicazione dinamica.

Sono comunque presenti alcuni accorgimenti:

- nessuna libreria frontend esterna
- nessun uso di `eval` o HTML dinamico lato client
- social aperti con `rel="noopener noreferrer"`
- `.htaccess` con hardening base

Da verificare sempre dopo la messa online:

- comportamento reale degli header di sicurezza
- corretto funzionamento dell'HTTPS
- compatibilità tra policy di sicurezza ed elementi esterni come FormSubmit e Google Maps

## Miglioramenti possibili

- aggiunta di una hero section iniziale
- gestione automatica del link attivo in base alla sezione visibile
- messaggi di validazione form più raffinati
- privacy e cookie page complete
- migliore accessibilità del menu mobile
- ottimizzazione SEO e metadata social
- immagini più leggere e favicon definitiva

## Licenza

Nessuna licenza è attualmente dichiarata nel progetto.

Se il template deve essere riusato o distribuito, conviene aggiungerne una esplicita.
