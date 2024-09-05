document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM entièrement chargé et analysé');

    // Attacher le gestionnaire d'événements au formulaire
    const loginForm = document.getElementById('login-form-email');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('Formulaire de login introuvable');
    }
});

function handleLogin(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    console.log('Tentative de connexion avec:', email); // Debug pour vérifier que le JS s'exécute

    // Validation simplifiée des champs de formulaire
    if (!email || !password) {
        document.getElementById('message').innerText = 'Tous les champs sont obligatoires.';
        return;
    }

    // Envoi de la requête fetch POST
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse du serveur:', data);  // Affiche la réponse du serveur
            if (data.message === 'Connexion réussie') {
                window.location.href = '/?success=Connexion effectuée avec succès';
            } else {
                document.getElementById('message').innerText = data.message || 'Problème de connexion.';
            }
        })
        .catch(error => {
            console.error('Erreur lors de la connexion:', error);
            document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        });
}


function checkInputs() {
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button');
    const passwordInstructions = document.getElementById('password-instructions');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Validation basique d'e-mail
    const passwordRegex = /^.{8,}$/;  // Minimum 8 caractères pour le mot de passe

    if (email.value.match(emailRegex) && password.value.match(passwordRegex)) {
        loginButton.disabled = false;
        loginButton.style.backgroundColor = '#7059D7';
        loginButton.style.color = '#FFF';
        email.style.borderColor = '#52A5FF';
        password.style.borderColor = '#52A5FF';
        passwordInstructions.style.color = '#52A5FF';
    } else {
        loginButton.disabled = true;
        loginButton.style.backgroundColor = '';
        loginButton.style.color = '';
        email.style.borderColor = '';
        password.style.borderColor = '';
        passwordInstructions.style.color = password.value ? 'red' : '';
    }
}

document.getElementById('email-input').addEventListener('input', checkInputs);
document.getElementById('password-input').addEventListener('input', checkInputs);


function handleCredentialResponse(response) {
    fetch('/login/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: response.credential }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur pour la connexion google:', data);  // Debug : Réponse du serveur
            window.location.href = '/?success=Connexion effectuée avec succès';
        })
        .catch(error => {
            console.error('Erreur de connexion:', error);
            document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        });
}

if (!navigator.cookieEnabled) {
    document.getElementById('message').innerText = 'Les cookies sont désactivés dans votre navigateur. Veuillez les activer pour utiliser l\'authentification Google.';
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Vérifiez si un script Google n'est pas chargé
    const googleSignInButton = document.querySelector('.g_id_signin');
    if (!googleSignInButton) {
        const messageDiv = document.createElement('div');
        messageDiv.style.color = 'red';
        messageDiv.innerText = 'Il semble qu\'un bloqueur de publicités ou un autre logiciel de blocage empêche certaines fonctionnalités de fonctionner correctement. Veuillez désactiver ces extensions pour ce site.';
        document.body.prepend(messageDiv);
    }
});
