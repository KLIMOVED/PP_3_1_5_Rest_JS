document.addEventListener('DOMContentLoaded', async function() {
    await loadRoles();

    window.addUser = async function() {
        const newUser = {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            roles: Array.from(document.getElementById('roles').selectedOptions).map(option => ({ id: option.value }))
        };

        await addUserToServer(newUser);
        await updateUsersTable();
        document.getElementById('addUserForm').reset();
        $('#usersTable-tab').tab('show');
    };
});

async function loadRoles() {
    const response = await fetch('/api/roles');
    const roles = await response.json();
    const rolesSelect = document.getElementById('roles');
    rolesSelect.innerHTML = '';
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name.substring(5);
        rolesSelect.appendChild(option);
    });
}

async function addUserToServer(user) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}

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
