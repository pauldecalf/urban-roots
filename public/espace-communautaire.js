document.addEventListener('DOMContentLoaded', () => {
    console.log('Script JS -> espace-communautaire.js chargé');
    init();
});

let init = () => {
    ajouterReponseDiv();
    ajouterReponseRequest();
}

let ajouterReponseDiv = () => {
    // Sélectionne tous les boutons avec la classe 'ajouter-une-reponse'
    document.querySelectorAll('.ajouter-une-reponse').forEach(button => {
        button.addEventListener('click', function () {
            // Sélectionne le formulaire de réponse associé au bouton cliqué
            const reponseDiv = this.closest('.post').querySelector('.reponseDiv');
            if (reponseDiv.classList.contains('hidden')) {
                reponseDiv.classList.remove('hidden');
                this.style.backgroundColor = '#E6E2FB';
            } else {
                reponseDiv.classList.add('hidden');
                this.style.backgroundColor = '#ECECEC';
            }
        });
    });
}

let ajouterReponseRequest = () => {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const publicationId = button.getAttribute('data-publication-id'); // Récupère l'ID de la publication

            if (!publicationId) {
                console.error('ID de publication manquant');
                return;
            }

            try {
                const isLiked = button.classList.contains('liked'); // Vérifie si le bouton a déjà la classe 'liked'
                let response;

                if (isLiked) {
                    // Requête DELETE pour retirer le like
                    response = await fetch(`/LikePublication/${publicationId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                } else {
                    // Requête POST pour ajouter un like
                    response = await fetch(`/LikePublication/${publicationId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }

                if (response.ok) {
                    // On retire l'icon pour mettre <img src="img/icons8-love-48.png" height="20px" width="20px" alt="Icon indicating that the publication is liked">\n' +


                    const heartIcon = button.querySelector('i');
                    heartIcon.style.color = isLiked ? 'black' : 'red'; // Change la couleur de l'icône en fonction de l'action effectuée
                } else {
                    console.error('Erreur lors de la requête:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        });
    });
};

