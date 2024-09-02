document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const orderButton = document.getElementById('orderButton');
    const foodInput = document.getElementById('foodInput');
    const addFoodButton = document.getElementById('addFoodButton');
    const foodList = document.getElementById('foodList');
    const orderList = document.getElementById('orderList');
    const loginMessage = document.getElementById('loginMessage');
    const signupMessage = document.getElementById('signupMessage');
    const authSection = document.getElementById('authSection');
    const foodSection = document.getElementById('foodSection');

    // Show or hide sections based on authentication
    const updateUI = () => {
        if (localStorage.getItem('authenticated') === 'true') {
            authSection.style.display = 'none';
            foodSection.style.display = 'block';
        } else {
            authSection.style.display = 'block';
            foodSection.style.display = 'none';
        }
    };

    // Login functionality
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check credentials (this is just a mock; in real applications, use secure methods)
        if (username === 'user' && password === 'password') {
            localStorage.setItem('authenticated', 'true');
            updateUI();
        } else {
            loginMessage.textContent = 'Invalid credentials';
        }
    });

    // Sign up functionality
    signupButton.addEventListener('click', () => {
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Save credentials (this is just a mock; in real applications, use secure methods)
        if (newUsername && newPassword) {
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);
            signupMessage.textContent = 'Sign up successful';
        } else {
            signupMessage.textContent = 'Please fill in all fields';
        }
    });

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authenticated');
        updateUI();
    });

    // Add food item
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

    // Order functionality
    orderButton.addEventListener('click', () => {
        const orderItems = Array.from(foodList.querySelectorAll('li')).map(li => li.textContent.replace('Delete', '').trim());

        if (orderItems.length > 0) {
            const orderItemList = document.createElement('li');
            orderItemList.textContent = `Order: ${orderItems.join(', ')}`;
            orderList.appendChild(orderItemList);

            foodList.innerHTML = '';
        } else {
            alert('Add some food items before placing an order.');
        }
    });

    // Check authentication status on page load
    updateUI();

    // Allow pressing Enter to add food item
    foodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addFoodButton.click();
        }
    });
});
