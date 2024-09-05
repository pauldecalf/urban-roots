
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script JS -> espace-communautaire.js chargé');
    init();
});

let init = () => {
    ajouterReponseDiv();
    ajouterReponseRequest();
}

let ajouterReponseDiv = async (publicationId) => {
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

let ajouterReponseRequest = async (publicationId) => {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const publicationId = button.getAttribute('data-publication-id'); // Récupère l'ID de la publication

            try {
                let response = await fetch(`/${publicationId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // Traitez la réponse, mise à jour du bouton
                    button.classList.toggle('liked');
                    const heartIcon = button.querySelector('i');
                    if (button.classList.contains('liked')) {
                        heartIcon.classList.replace('fi-rr-heart', 'fi-sr-heart'); // Icône cœur plein
                    } else {
                        heartIcon.classList.replace('fi-sr-heart', 'fi-rr-heart'); // Icône cœur vide
                    }
                } else {
                    console.error('Erreur lors de la requête', response.statusText);
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        });
    });
}