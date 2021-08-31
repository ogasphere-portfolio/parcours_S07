let app = {

    apiRootUrl: 'http://localhost:8080/',
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
            cache: 'no-cache',
            
            
            };
        //TODO faire le fetch
        fetch(app.apiRootUrl + "videogames/"+ idNewReview +"/reviews")
        .then(function(response) {return response.json();})
            
            .then(function(jsonDatas) {
                console.log(jsonDatas);  
                 
                for (const jsonData of jsonDatas) {
                  
                    
                    // get template
                    const reviewTemplate = document.querySelector('#reviewTemplate');
                    const documentFragment = reviewTemplate.content.cloneNode(true);
                    
                    // get data from API
                    const idReview = jsonData.id;
                    const authorReview = jsonData.author;
                    const dateReview = jsonData.created_at;
                    const textReview = jsonData.text;
                    const titleReview = jsonData.title;
                    const editorReview = jsonData.platform.manufacturer;
                    const platformReview = jsonData.platform.name;
                    const display_noteReview = jsonData.display_note;
                    const gameplay_noteReview = jsonData.gameplay_note;
                    const scenario_noteReview = jsonData.scenario_note;
                    const lifetime_noteReview = jsonData.lifetime_note;

                    
                  
                    
                    // get placement to send input
                    const authorInput = documentFragment.querySelector('.reviewAuthor');
                    const dateInput = documentFragment.querySelector('.reviewPublication');
                    const textInput = documentFragment.querySelector('.reviewText');
                    const titleInput = documentFragment.querySelector('.reviewVideogame');
                    const editorInput = documentFragment.querySelector('.reviewEditor');
                    const platformInput = documentFragment.querySelector('.reviewPlatform');
                    const display_noteInput = documentFragment.querySelector('.reviewDisplay');
                    const gameplay_noteInput = documentFragment.querySelector('.reviewGameplay');
                    const scenario_noteInput = documentFragment.querySelector('.reviewScenario');
                    const lifetime_noteInput = documentFragment.querySelector('.reviewLifetime');

 
                    // Affectation des valeurs retournées par l'API aux elements HTML
                    authorInput.innerHTML = authorReview
                    dateInput.innerHTML = dateReview
                    textInput.innerHTML = textReview
                    titleInput.innerHTML = titleReview
                    editorInput.innerHTML = editorReview
                    platformInput.innerHTML = platformReview
                    display_noteInput.innerHTML = display_noteReview
                    gameplay_noteInput.innerHTML = gameplay_noteReview
                    scenario_noteInput.innerHTML = scenario_noteReview
                    lifetime_noteInput.innerHTML = lifetime_noteReview
                   
                   
                    
                    const divReview = documentFragment.querySelector('.reviewContainer');
                    console.log(divReview);
                    // appendChild du clone
                    const reviewList = document.querySelector('#review');
                    // attention à ne pas prendre le documentFragment mais bien la DIV
                    reviewList.appendChild(divReview);

                    
                   
                }
            }   
        )
        
    }
};

document.addEventListener('DOMContentLoaded', app.init);