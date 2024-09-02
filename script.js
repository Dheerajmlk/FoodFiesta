document.addEventListener('DOMContentLoaded', () => {
    const foodInput = document.getElementById('foodInput');
    const addFoodButton = document.getElementById('addFoodButton');
    const foodList = document.getElementById('foodList');

    addFoodButton.addEventListener('click', () => {
        const foodItem = foodInput.value.trim();
        
        if (foodItem) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${foodItem} <button class="deleteButton">Delete</button>
            `;
            
            listItem.querySelector('.deleteButton').addEventListener('click', () => {
                foodList.removeChild(listItem);
            });
            
            foodList.appendChild(listItem);
            foodInput.value = '';
            foodInput.focus();
        }
    });

    foodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addFoodButton.click();
        }
    });
});
