document.addEventListener('DOMContentLoaded', async function () {
    await updateUsersTable();
});

async function fetchUsers() {
    const response = await fetch('/api/users');
    return await response.json();
}

async function updateUsersTable() {
    const users = await fetchUsers();
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', user.id);
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.username}</td>
            <td>${user.roles.map(role => role.name.substring(5)).join(' ')}</td>
            <td><button class="btn btn-primary" onclick="editUser(${user.id})">Edit</button></td>
            <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>
        `;
        usersList.appendChild(row);
    });
}












