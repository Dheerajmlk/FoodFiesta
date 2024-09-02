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


    const updateUI = () => {
        if (localStorage.getItem('authenticated') === 'true') {
            authSection.style.display = 'none';
            foodSection.style.display = 'block';
        } else {
            authSection.style.display = 'block';
            foodSection.style.display = 'none';
        }
    };


    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        

        if (username === 'user' && password === 'password') {
            localStorage.setItem('authenticated', 'true');
            updateUI();
        } else {
            loginMessage.textContent = 'Invalid credentials';
        }
    });


    signupButton.addEventListener('click', () => {
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;


        if (newUsername && newPassword) {
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);
            signupMessage.textContent = 'Sign up successful';
        } else {
            signupMessage.textContent = 'Please fill in all fields';
        }
    });


    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authenticated');
        updateUI();
    });


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


    updateUI();


    foodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addFoodButton.click();
        }
    });
});
