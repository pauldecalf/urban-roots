document.addEventListener('DOMContentLoaded', () => {
    console.log('Script JS -> espace-communautaire.js chargé');
    init();
});

let init = () => {
    ajouterReponseDiv();
    ajouterReponseRequest();

    // Ajoutez la classe 'liked' aux boutons déjà likés au chargement de la page
    document.querySelectorAll('.like-btn').forEach(button => {
        const isLiked = button.getAttribute('data-publication-liked') === 'true'; // Vérifie si la publication est déjà likée
        if (isLiked) {
            button.classList.add('liked'); // Ajoute la classe 'liked' au bouton
            const heartIcon = button.querySelector('i');
            heartIcon.style.color = 'red'; // Change la couleur de l'icône pour les publications déjà likées
        }
    });
}

let ajouterReponseDiv = () => {
    document.querySelectorAll('.ajouter-une-reponse').forEach(button => {
        button.addEventListener('click', function () {
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
            const publicationId = button.getAttribute('data-publication-id');

            if (!publicationId) {
                console.error('ID de publication manquant');
                return;
            }

            try {
                const isLiked = button.classList.contains('liked');
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
                    const heartIcon = button.querySelector('i');
                    button.classList.toggle('liked');
                    heartIcon.style.color = isLiked ? 'black' : 'red';
                } else {
                    console.error('Erreur lors de la requête:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        });
    });
};
