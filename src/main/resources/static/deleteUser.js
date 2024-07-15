document.addEventListener('DOMContentLoaded', function () {

    window.deleteUser = async function (userId) {
        const user = await fetchUserData(userId);
        fillDeleteModal(user);
        $('#deleteModal').modal('show');
        window.userIdToDelete = user.id;
    };

    window.confirmDeleteUser = async function () {
        await deleteUserFromServer(window.userIdToDelete);
        removeUserRow(window.userIdToDelete);
        $('#deleteModal').modal('hide');
    };
});

async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
}

function fillDeleteModal(user) {
    document.getElementById('idDelete').value = user.id;
    document.getElementById('firstnameDelete').value = user.firstName;
    document.getElementById('lastnameDelete').value = user.lastName;
    document.getElementById('usernameDelete').value = user.username;
    const rolesSelect = document.getElementById('userRolesDelete');
    rolesSelect.innerHTML = '';
    user.roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name.substring(5);
        option.selected = true;
        rolesSelect.appendChild(option);
    });
}

async function deleteUserFromServer(userId) {
    await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });
}

function removeUserRow(userId) {
    const row = document.querySelector(`#users-list tr[data-id='${userId}']`);
    row.remove();
}
