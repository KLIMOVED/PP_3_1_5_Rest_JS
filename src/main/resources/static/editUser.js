document.addEventListener('DOMContentLoaded', function() {

    window.editUser = async function(userId) {
        const user = await fetchUserData(userId);
        const roles = await fetchRoles();
        fillEditModal(user, roles);
        $('#editModal').modal('show');
    };

    window.updateUser = async function() {
        const userId = document.getElementById('edit-user-id').value;
        const updatedUser = {
            id: userId,
            firstName: document.getElementById('firstnameEdit').value,
            lastName: document.getElementById('lastnameEdit').value,
            username: document.getElementById('usernameEdit').value,
            password: document.getElementById('passwordEdit').value,
            roles: Array.from(document.getElementById('allRoles').selectedOptions).map(option => ({
                id: option.value,
                name: option.text
            }))
        };

        const data = await updateUserOnServer(updatedUser);
        updateUserRow(updatedUser);
        $('#editModal').modal('hide');
    };
});

async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
}

async function fetchRoles() {
    const response = await fetch('/api/roles');
    return await response.json();
}

function fillEditModal(user, roles) {
    document.getElementById('edit-user-id').value = user.id;
    document.getElementById('idEdit').value = user.id;
    document.getElementById('firstnameEdit').value = user.firstName;
    document.getElementById('lastnameEdit').value = user.lastName;
    document.getElementById('usernameEdit').value = user.username;
    document.getElementById('passwordEdit').value = user.password;
    const rolesSelect = document.getElementById('allRoles');
    rolesSelect.innerHTML = '';
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name.substring(5);
        if (user.roles.some(userRole => userRole.id === role.id)) {
            option.selected = true;
        }
        rolesSelect.appendChild(option);
    });
}

async function updateUserOnServer(user) {
    const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}

function updateUserRow(user) {
    const userRow = document.querySelector(`#users-list tr[data-id="${user.id}"]`);
    userRow.children[1].innerText = user.firstName;
    userRow.children[2].innerText = user.lastName;
    userRow.children[3].innerText = user.username;
    userRow.children[4].innerText = user.roles.map(role => role.name).join(' ');
}
