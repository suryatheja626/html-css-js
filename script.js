const initialProviders = [
    { name: "John Doe", category: "Tutor", location: "Downtown", rate: 25 },
    { name: "Jane Smith", category: "Driver", location: "Uptown", rate: 20 },
    { name: "Robert Johnson", category: "Domestic Help", location: "Downtown", rate: 18 },
    { name: "Emily Davis", category: "Tutor", location: "Suburbs", rate: 30 }
];

function getProviders() {
    const stored = localStorage.getItem("skillmart_providers");
    if (!stored) {
        localStorage.setItem("skillmart_providers", JSON.stringify(initialProviders));
        return initialProviders;
    }
    return JSON.parse(stored);
}

function renderProviders(providers) {
    const grid = document.getElementById("servicesGrid");
    grid.innerHTML = "";
    
    if (providers.length === 0) {
        grid.innerHTML = "<p>No service providers found matching your criteria.</p>";
        return;
    }

    providers.forEach(provider => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-body">
                <span class="category-badge">${provider.category}</span>
                <h3 class="card-title">${provider.name}</h3>
                <p class="location-info">📍 Location: ${provider.location}</p>
                <p class="location-info">💵 Rate: $${provider.rate}/hr</p>
                <button class="contact-btn" onclick="alert('Connecting to ${provider.name}')">Book / Contact</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterServices() {
    const locationText = document.getElementById("locationInput").value.toLowerCase();
    const categoryText = document.getElementById("categorySelect").value;
    const providers = getProviders();

    const filtered = providers.filter(provider => {
        const matchesLocation = provider.location.toLowerCase().includes(locationText);
        const matchesCategory = categoryText === "All" || provider.category === categoryText;
        return matchesLocation && matchesCategory;
    });

    renderProviders(filtered);
}

function openModal() {
    document.getElementById("registerModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("registerModal").style.display = "none";
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById("workerName").value;
    const category = document.getElementById("workerCategory").value;
    const location = document.getElementById("workerLocation").value;
    const rate = document.getElementById("workerRate").value;

    const newProvider = { name, category, location, rate };
    const providers = getProviders();
    providers.push(newProvider);
    
    localStorage.setItem("skillmart_providers", JSON.stringify(providers));
    renderProviders(providers);
    
    document.getElementById("registrationForm").reset();
    closeModal();
}

window.onload = function() {
    renderProviders(getProviders());
};
