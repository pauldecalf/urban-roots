function handleRegister(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom-input').value;
    const nom = document.getElementById('nom-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const genre = document.querySelector('input[name="genre"]:checked').value;
    const imgProfil = document.getElementById('profile-picture').files[0];

    // Validation simplifiée des champs de formulaire
    if (!prenom || !nom || !email || !password || !genre || !imgProfil) {
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

function checkInputs() {
    const prenom = document.getElementById('prenom-input');
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');
    const registerButton = document.getElementById('register-button');
    const passwordInstructions = document.getElementById('password-instructions');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (prenom.value && email.value && password.value.match(passwordRegex)) {
        registerButton.disabled = false;
        registerButton.style.backgroundColor = '#7059D7';
        registerButton.style.color = '#FFF';
        prenom.style.borderColor = '#52A5FF';
        email.style.borderColor = '#52A5FF';
        password.style.borderColor = '#52A5FF';
        passwordInstructions.style.color = '#52A5FF';
    } else {
        registerButton.disabled = true;
        registerButton.style.backgroundColor = '';
        registerButton.style.color = '';
        prenom.style.borderColor = '';
        email.style.borderColor = '';
        password.style.borderColor = '';
        passwordInstructions.style.color = password.value ? 'red' : '';
    }
}

document.getElementById('prenom-input').addEventListener('input', checkInputs);
document.getElementById('email-input').addEventListener('input', checkInputs);
document.getElementById('password-input').addEventListener('input', checkInputs);






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
