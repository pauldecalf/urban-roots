document.addEventListener('DOMContentLoaded', (event) => {
    const jardinsData = document.getElementById('jardinsData').value;  // Récupérer les données JSON
    let jardins;

    try {
        jardins = JSON.parse(jardinsData);  // Parsez les données JSON
    } catch (error) {
        console.error('Erreur lors du parsing des données jardins:', error);
        return;
    }

    // Créez votre carte avec Leaflet et ajoutez les marqueurs ici...
    const map = L.map('map').setView([48.8566, 2.3522], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const markers = L.markerClusterGroup();

    jardins.forEach(jardin => {
        if (typeof jardin.latitude === 'number' && typeof jardin.longitude === 'number') {
            const marker = L.marker([jardin.latitude, jardin.longitude])
                .bindPopup(`
                    <b>${jardin.nom}</b><br>
                    ${jardin.adresse}, ${jardin.codePostal} ${jardin.ville}<br>
                    <a href="${jardin.siteWeb}" target="_blank">Voir le site</a><br>
                    <img src="${jardin.image}" alt="${jardin.nom}" style="width:100px;height:auto;"><br>
                    ${jardin.description}<br>
                    <b>Horaires :</b> ${jardin.horaires}<br>
                    <b>Type :</b> ${jardin.type}<br>
                    <b>Public :</b> ${jardin.public}<br>
                `);

            markers.addLayer(marker);
        } else {
            console.error('Invalid LatLng for jardin:', jardin);
        }
    });

    map.addLayer(markers);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            map.setView([userLat, userLng], 13);

            L.marker([userLat, userLng]).addTo(map)
                .bindPopup('Vous êtes ici')
                .openPopup();
        }, (error) => {
            console.error('Erreur lors de la récupération de la position de l\'utilisateur :', error);
        });
    } else {
        console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
});
document.getElementById('ctaformulaireJardin').addEventListener('click', () => {
    if ( document.getElementById('ctaformulaireJardin').innerText == 'Retour à la carte'){

            document.getElementById('formulaireJardin').style.display = 'none';
            document.getElementById('map').style.display = 'block';
            document.getElementById('ctaformulaireJardin').innerText = 'Ajouter un jardin';
    } else {
            document.getElementById('formulaireJardin').style.display = 'block';
            document.getElementById('map').style.display = 'none';
            document.getElementById('ctaformulaireJardin').innerText = 'Retour à la carte';
    }
});