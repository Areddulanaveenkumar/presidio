document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const postPropertyForm = document.getElementById('postPropertyForm');
    const propertyList = document.getElementById('propertyList');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, phone, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
    });

    postPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const place = document.getElementById('place').value;
        const area = document.getElementById('area').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const nearby = document.getElementById('nearby').value;

        fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ place, area, bedrooms, bathrooms, nearby })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadProperties();
        })
        .catch(error => console.error('Error:', error));
    });

    function loadProperties() {
        fetch('/api/properties')
        .then(response => response.json())
        .then(data => {
            propertyList.innerHTML = '';
            data.properties.forEach(property => {
                const propertyDiv = document.createElement('div');
                propertyDiv.className = 'property';
                propertyDiv.innerHTML = `
                    <p><strong>Place:</strong> ${property.place}</p>
                    <p><strong>Area:</strong> ${property.area}</p>
                    <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                    <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
                    <p><strong>Nearby:</strong> ${property.nearby}</p>
                    <button>I'm Interested</button>
                `;
                propertyList.appendChild(propertyDiv);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    loadProperties();
});
