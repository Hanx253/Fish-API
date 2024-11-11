document.addEventListener("DOMContentLoaded", () => {
    const listElement = document.querySelector('.list');
    const baseURL = 'https://seanimal-recognizer-api.onrender.com';

    const getNames = async () => {
        const response = await fetch(`${baseURL}/seaAnimals`);
        const data = await response.json();
        const { seaAnimals } = data;

        seaAnimals.forEach(animal => {
            const newOption = document.createElement('option');
            newOption.value = animal.name;
            newOption.textContent = animal.name;
            listElement.appendChild(newOption);
        });
    };

    listElement.addEventListener('change', async (event) => {
        const selectedAnimal = event.target.value;

        try {
            const response = await fetch(`${baseURL}/name/:${encodeURIComponent(selectedAnimal)}`);
            const animalData = await response.json();

            document.getElementById('animal-name').textContent = animalData.name || "Name not available";
            document.getElementById('location').textContent = animalData.location || "Location not available";
            document.getElementById('color').textContent = animalData.color || "Color not available";
            document.getElementById('size').textContent = animalData.size || "Size not available";
            document.getElementById('description').textContent = animalData.shortDescription || "Description not available";
        } catch (error) {
            console.error('Error fetching sea animal info:', error);
        }
    });

    getNames();
});
