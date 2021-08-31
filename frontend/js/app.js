let app = {

    apiRootUrl: 'http://localhost:8080/',

    videoGames_fetchOptions: {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    },

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

        // handle Form submit
        const formElement = document.querySelector('#addVideogameForm');
        formElement.addEventListener("submit", app.handleFormSubmit);
        
       
    },
    
    handleClickToAddVideogame: function(evt) {
        // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');
    },

    loadVideoGames: function() {
       
        fetch(app.apiRootUrl + 'videogames', app.videoGames_fetchOptions)
        
        .then(function(response){return response.json(); })
        
        .then(function(responseJson){

            //  get select element
            const selectVideoGames = document.querySelector('#videogameId')
        
            // je parcours un tableau d'objet (responseJson.category)
            for (const videogame of responseJson) {
                // Je crée l'option pour le menu
                const option = document.createElement('option');
                console.log(option);
                option.innerText =videogame.name;
                option.value = videogame.id;
                selectVideoGames.appendChild(option);
            }
            
        });
    },

    handleChangeReviewFilter: function(event){
 
        const selectReview = document.querySelector('#videogameId');
        const idNewReview = selectReview.value;
        
        // suppression des reviews existantes
        const divDel = document.querySelector('#review');
        while (divDel.firstChild) {
            divDel.removeChild(divDel.firstChild);
        }
      
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
                    const editorReview = jsonData.videogame.editor;
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

                    // binding
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

                    // get div container
                    const divReview = documentFragment.querySelector('.reviewContainer');
                    // appendChild of clone
                    const reviewList = document.querySelector('#review');
                    reviewList.appendChild(divReview);

                }
            }   
        )
        
    },

    handleFormSubmit: function (event) {
        
     //   event.preventDefault();
        
       
    
    
        // je récupére les valeurs saisies dans mon formumaire
        const inputName = document.querySelector('#inputName');
        const inputEditor = document.querySelector('#inputEditor');

        const newName = inputName.value;
        const newEditor = inputEditor.value;

        // controle de la saisie
        if(newName == "" || newEditor == "")
        {
            console.log('test');
            event.preventDefault();
            document.getElementById("erreur").innerHTML = "Tous les champs du formulaire doivent être remplis";
            document.getElementById("erreur").style.color="red";
            document.getElementById("name_form").style.borderColor="red";
            document.getElementById("erreur").style.backgroundColor = "green";
             
            setTimeout(function()
            {
             document.getElementById('erreur').innerHTML = "";
            },8000);
        }

        // données à envoyer à l'API pour ajouter le jeux
        data = {
            "name" : newName,
            "editor" : newEditor,
            "statut" : 1
        };
        
        // je prépare l'entête pour mon fetch POST
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
    
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(data)
        };
    
        fetch(app.apiRootUrl + "videogames", fetchOptions)
        .then(function(response){
            
            if (response.status == 200) {

                // todo afficher un message de succés
                return response.json();
            } else {
                 // todo afficher un message d'echec
                alert('L\'ajout a échoué '+response.status);
            }

        })
        
            .then(function(responseJson){   // je récupére la réponse de l'ajout
 
                        // j'insére mon nouvel élémént crée dans le select
                        const selectVideoGames = document.querySelector('#videogameId')
                        // Je crée l'option
                        const option = document.createElement('option');
                        option.innerText =responseJson.name;
                        option.value = responseJson.id
                        selectVideoGames.appendChild(option);

            })
       
    }
};



document.addEventListener('DOMContentLoaded', app.init);