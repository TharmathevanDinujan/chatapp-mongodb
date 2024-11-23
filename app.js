const form = document.getElementById('userForm');
const tableBody = document.querySelector('#userTable tbody');
const apiUrl = 'http://localhost:3000/users'; // Update this with your server's endpoint

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    

    try {
        // Send data to the server
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name})
        });

        // Refresh the table
        loadUsers();
    } catch (err) {
        console.error('Error saving data:', err);
    }

    // Clear the form
    form.reset();
});

// Fetch and display users
async function loadUsers() {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();

        // Clear the table
        tableBody.innerHTML = '';

        // Populate the table
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.username}</td><td>${user.name}</td>`;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

// Initial load
loadUsers();
