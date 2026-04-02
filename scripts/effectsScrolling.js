/*
Selezioniamo tutti i link presenti dentro la parte destra della navbar che puntano alle varie sezioni della pagina e nel menu a tendina.
Si scorrono tutti tramite la varibile anchor.
*/
document.querySelectorAll('.navbar-2 a, .mobile-menu a').forEach(anchor => {

    /* 
    Per ogni link del navbar aggiungiamo un listener sul click.
    Quando l'utente clicca, eseguiamo uno scroll personalizzato invece di lasciare fare al browser il comportamento standard dell'ancoraggio.
    */
    anchor.addEventListener('click', function (e) {
        /* 
        Blocchiamo il comportamento normale del link.
        Senza questa riga, il browser farebbe subito il salto diretto alla sezione, annullando l'effetto di scroll graduale che vogliamo ottenere.
        */
        e.preventDefault();

        // Recuperiamo l'href del link cliccato.
        const targetId = this.getAttribute('href');

        // Togliamo la classe active da tutti i link desktop e mobile che li colora di rosso.
        document.querySelectorAll('.navbar-2 a, .mobile-menu a').forEach(link => {
            link.classList.remove('active');
        });

        // Aggiungiamo la classe active a tutti i link che puntano alla stessa sezione del link cliccato colorando di rosso solo il link giusto.
        document.querySelectorAll(`.navbar-2 a[href="${targetId}"], .mobile-menu a[href="${targetId}"]`).forEach(link => {
            link.classList.add('active');
        });

        // Cerchiamo nell'HTML l'elemento che corrisponde a quell'id.
        const targetElement = document.querySelector(targetId);
        
        /* 
        Controlliamo che l'elemento esista davvero prima di procedere.
        Questo evita errori nel caso in cui il link punti a un id inesistente.
        */
        if (targetElement) {
 
            /*
            Selezioniamo la navbar per misurarne l'altezza reale in pixel.
            Usiamo `offsetHeight` perché restituisce l'altezza completa dell'elemento visibile.
            */
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            /* 
            Avviamo la funzione di scroll lento, costruita sotto, con i parametri passati:
            - `targetElement`: la sezione verso cui vogliamo andare;
            - `700`: la durata dell'animazione in millisecondi;
            - `navbarHeight`: l'offset da sottrarre per non coprire il contenuto con la navbar.
            */
            smoothScrollTo(targetElement, 700, navbarHeight);
        }
    });
});

// Funzione che realizza manualmente uno scroll animato verso un elemento.
// Parametri:
// - `element`: elemento HTML destinazione
// - `duration`: durata totale dell'animazione in millisecondi
// - `offset`: spazio da sottrarre alla destinazione finale
//   (nel tuo caso serve per compensare l'altezza della navbar fissa)
function smoothScrollTo(element, duration, offset) {

    // Salviamo la posizione verticale attuale della pagina al momento del click.
    // `window.pageYOffset` indica quanti pixel abbiamo già scrollato dall'alto.
    // Questa sarà la posizione di partenza dell'animazione.
    const startPosition = window.pageYOffset;

    // Calcoliamo la posizione finale da raggiungere.
    //
    // `element.getBoundingClientRect().top`
    // restituisce la distanza tra l'elemento e la parte visibile alta della finestra.
    //
    // Sommando `startPosition`, trasformiamo quella distanza in una posizione assoluta
    // rispetto all'intera pagina.
    //
    // Infine sottraiamo `offset` per tenere conto della navbar fissa.
    // Così la sezione si fermerà subito sotto la barra, non dietro.
    const targetPosition = element.getBoundingClientRect().top + startPosition - offset;

    // Calcoliamo di quanti pixel in totale ci dobbiamo spostare.
    // Se il numero è positivo, stiamo andando verso il basso.
    // Se è negativo, stiamo andando verso l'alto.
    const distance = targetPosition - startPosition;

    // Variabile che conterrà il tempo iniziale dell'animazione.
    // All'inizio è `null` perché il primo frame non è ancora partito.
    let startTime = null;

    // Funzione interna che verrà richiamata più volte da `requestAnimationFrame`.
    // `currentTime` è un timestamp automatico fornito dal browser.
    function animation(currentTime) {

        // Al primo frame salviamo il tempo di partenza.
        // Questo ci permette di sapere in seguito quanto tempo è passato.
        if (startTime === null) startTime = currentTime;

        // Calcoliamo quanto tempo è trascorso dall'inizio dell'animazione.
        const timeElapsed = currentTime - startTime;
        
        // Calcoliamo la nuova posizione da raggiungere in questo frame.
        //
        // La funzione `ease(...)` non restituisce direttamente "quanto manca",
        // ma la posizione esatta in cui la pagina deve stare in questo momento,
        // creando un movimento morbido che accelera e poi rallenta.
        const run = ease(timeElapsed, startPosition, distance, duration);
        
        // Spostiamo effettivamente la pagina alla posizione calcolata.
        // `0` indica che non cambiamo l'asse orizzontale.
        // `run` è il nuovo valore verticale.
        window.scrollTo(0, run);
        
        // Se non abbiamo ancora raggiunto la durata totale dell'animazione,
        // chiediamo al browser di eseguire un nuovo frame.
        // Questo crea il movimento progressivo.
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Funzione di easing.
    //
    // Serve a rendere il movimento più naturale:
    // invece di andare a velocità costante,
    // parte più dolcemente, accelera nella parte centrale
    // e rallenta prima di fermarsi.
    //
    // Parametri:
    // - `t`: tempo trascorso
    // - `b`: posizione iniziale
    // - `c`: distanza totale da percorrere
    // - `d`: durata totale
    function ease(t, b, c, d) {

        // Normalizziamo il tempo dividendolo per metà durata.
        // Questo ci permette di gestire separatamente
        // la prima metà dell'animazione e la seconda metà.
        t /= d / 2;

        // Prima metà dell'animazione:
        // il movimento accelera in modo graduale.
        if (t < 1) return c / 2 * t * t + b;

        // Seconda metà dell'animazione:
        // il movimento rallenta gradualmente fino a fermarsi.
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Avviamo l'animazione chiedendo al browser il primo frame.
    // Da qui in poi la funzione `animation(...)` verrà richiamata più volte
    // fino a completare lo scroll.
    requestAnimationFrame(animation);
}

