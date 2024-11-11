document.addEventListener("DOMContentLoaded", async () => {
    
    const baseURL = 'https://seanimal-recognizer-api.onrender.com';

    const locationCategories = {
        "coral-reefs": ["Coral Reefs", "Coastal Waters", "Shallow Coastal Waters", "Tidal Pools"],
        "deep-sea": ["Deep Sea", "Open Waters", "Open Ocean"],
        "oceans": ["Atlantic", "Antarctic Ocean", "Indian Ocean", "Indo-Pacific", "Pacific Ocean", "Arctic Waters"],
        "temperature-based": ["Tropical and Subtropical Waters", "Tropical Waters", "Temperate Seas", "Warm Coastal Waters", "Cold Arctic Waters", "Cold Oceans"]
    };

    const resultsContainers = {
        "coral-reefs": document.getElementById("coral-reefs-result"),
        "deep-sea": document.getElementById("deep-sea-result"),
        "oceans": document.getElementById("oceans-result"),
        "temperature-based": document.getElementById("temperature-based-result")
    };

   
    const fetchSeaAnimals = async () => {
        const response = await fetch(`${baseURL}/seaAnimals`);
        const data = await response.json();
        return data.seaAnimals;
    };

    const seaAnimals = await fetchSeaAnimals();

    
    const displayAnimals = (animals, container) => {
        container.innerHTML = "";
        
        animals.forEach(animal => {
            const animalContainer = document.createElement("div");
            animalContainer.innerHTML = `
                <strong><i>Name:</i></strong> ${animal.name}<br>
                <strong><i>Location:</i></strong> ${animal.location}<br>
                <strong><i>Color:</i></strong> ${animal.color}<br>
                <strong><i>Size:</i></strong> ${animal.size}<br>
                <strong><i>Description:</i></strong> ${animal.shortDescription}
            `;
            container.appendChild(animalContainer);
        });
    };

    
    for (const categoryFish in locationCategories) {
        const selectElement = document.getElementById(categoryFish);
        selectElement.addEventListener('change', () => {
            const selectedLocation = selectElement.value.toLowerCase();
            const locations = locationCategories[categoryFish];
    
            const matchingAnimals = seaAnimals.filter(animal =>
                locations.some(location => animal.location.toLowerCase().includes(selectedLocation))
            );
    
            if (selectedLocation === "") {
                resultsContainers[categoryFish].innerHTML = "";
            } else {
                displayAnimals(matchingAnimals, resultsContainers[categoryFish]);
            }
        });
    }
    
});
