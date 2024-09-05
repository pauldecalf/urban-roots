// Fonction pour gérer l'inscription
function handleRegister(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom-input').value;
    const nom = document.getElementById('nom-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const genre = document.querySelector('input[name="genre"]:checked').value;
    const imgProfil = document.getElementById('profile-picture').files[0];
    const cgu = document.getElementById('terms-checkbox').checked;

    // Validation simplifiée des champs de formulaire
    if (!prenom || !nom || !email || !password || !genre || !imgProfil || !cgu) {
        document.getElementById('message').innerText = 'Tous les champs sont obligatoires.';
        return;
    }

    // Créer un objet FormData pour inclure les données du formulaire et le fichier
    const formData = new FormData();
    formData.append('prenom', prenom);
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('genre', genre);
    formData.append('imgProfil', imgProfil);

    // Envoyer la requête POST avec FormData
    fetch('/register', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Inscription réussie') {
                window.location.href = '/?success=Inscription%20réussie';
            } else {
                document.getElementById('message').innerText = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        });
}

// Fonction pour vérifier les entrées du formulaire
function checkInputs() {
    const prenom = document.getElementById('prenom-input');
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');
    const cgu = document.getElementById('terms-checkbox');
    const registerButton = document.getElementById('register-button');
    const passwordInstructions = document.getElementById('password-instructions');

    // Regex pour un mot de passe avec au moins 8 caractères (pas de majuscule ou chiffre requis)
    const passwordRegex = /^.{8,}$/;
    // Regex basique pour l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset des styles avant chaque vérification
    resetFieldStyles([prenom, email, password]);

    let isFormValid = true;

    // Vérification du prénom
    if (!prenom.value.trim()) {
        prenom.style.borderColor = 'red';
        isFormValid = false;
    } else {
        prenom.style.borderColor = '#52A5FF';
    }

    // Vérification de l'email
    if (!email.value.match(emailRegex)) {
        email.style.borderColor = 'red';
        isFormValid = false;
    } else {
        email.style.borderColor = '#52A5FF';
    }

    // Vérification du mot de passe (minimum 8 caractères)
    if (!password.value.match(passwordRegex)) {
        password.style.borderColor = 'red';
        passwordInstructions.style.color = 'red';
        isFormValid = false;
    } else {
        password.style.borderColor = '#52A5FF';
        passwordInstructions.style.color = '#52A5FF';
    }

    // Vérification de la case à cocher (CGU)
    if (!cgu.checked) {
        cgu.nextElementSibling.style.color = 'red';
        isFormValid = false;
    } else {
        cgu.nextElementSibling.style.color = '#52A5FF';
    }

    // Activer ou désactiver le bouton d'inscription en fonction de la validité du formulaire
    if (isFormValid) {
        registerButton.disabled = false;
        registerButton.style.backgroundColor = '#7059D7';
        registerButton.style.color = '#FFF';
    } else {
        registerButton.disabled = true;
        registerButton.style.backgroundColor = '';
        registerButton.style.color = '';
    }
}

// Fonction pour réinitialiser les styles des champs
function resetFieldStyles(fields) {
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

// Gestion de la prévisualisation de l'image de profil
document.getElementById('profile-picture').addEventListener('change', function(event) {
    const input = event.target;
    const preview = document.getElementById('profile-picture-preview');

    // Vérifie si un fichier est sélectionné
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        // Lorsque le fichier est chargé
        reader.onload = function(e) {
            // Met à jour la source de l'image et affiche la prévisualisation
            preview.src = e.target.result;
            preview.style.display = 'block';
        }

        // Lire le fichier sélectionné comme une URL de données
        reader.readAsDataURL(input.files[0]);
    } else {
        // Si aucun fichier n'est sélectionné, cacher la prévisualisation
        preview.style.display = 'none';
        preview.src = '';
    }
});

// Attacher les événements
document.getElementById('prenom-input').addEventListener('input', checkInputs);
document.getElementById('email-input').addEventListener('input', checkInputs);
document.getElementById('password-input').addEventListener('input', checkInputs);
document.getElementById('terms-checkbox').addEventListener('change', checkInputs);
document.getElementById('register-form').addEventListener('submit', handleRegister);
