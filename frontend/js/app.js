let app = {

    apiRootUrl: 'http://localhost:8090/',
    init: function() {
        console.log('app.init()');

        // On appelle la méthode s'occupant d'ajouter les EventListener sur les éléments déjà dans le DOM
        app.addAllEventListeners();

        // On appelle la méthode s'occupant de charger tous les jeux vidéo
        app.loadVideoGames();
    },
    addAllEventListeners: function() {
        // On récupère l'élément <select> des jeux vidéo
        const selectReviewFilter = document.querySelector("#videogameId");
        // On ajoute l'écouteur pour l'event "change", et on l'attache à la méthode app.handleVideogameSelected
        selectReviewFilter.addEventListener("change",app.handleChangeReviewFilter);
        // On récupère le bouton pour ajouter un jeu vidéo
        let addVideogameButtonElement = document.getElementById('btnAddVideogame');
        // On ajoute l'écouteur pour l'event "click"
        addVideogameButtonElement.addEventListener('click', app.handleClickToAddVideogame);
        
       
    },
    handleVideogameSelected: function(evt) {
        // Récupérer la valeur du <select> (id du videogame)

        // Vider le contenu de div#review

        // charger les données pour ce videogame
            // Dupliquer la template #reviewTemplate et personnaliser son contenu avec les données

            // Ajouter dans le DOM
    },
    handleClickToAddVideogame: function(evt) {
        // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');
    },
    loadVideoGames: function() {
        // Charger toutes les données des videogames
            // Ajouter une balise <option> par videogame
    },

    handleChangeReviewFilter: function(event){
       

        const selectReview = document.querySelector('#videogameId');
        const idNewReview = selectReview.value;
        console.log(idNewReview);

        const config = {
            method: 'GET',
            mode: 'cors',
            // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
            cache: 'no-cache',
            
            
            };
        //TODO faire le fetch
        fetch(app.apiRootUrl + "videogames/"+ idNewReview +"/reviews")
        .then(
            function(response) {
                    console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                                    
                    console.log('Modif ok')
                    // todo afficher les reviews en utilisant le template
                    
                }
                else {
                    alert('La modification à echoué :'+response.status);
                }
            }
        )
        
    }
};

document.addEventListener('DOMContentLoaded', app.init);