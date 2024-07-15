document.addEventListener('DOMContentLoaded', async function () {
    await updateNavbar();
    await updateTable();
});

async function fetchAuthUserData() {
    const response = await fetch('/api/user');
    return await response.json();
}

async function updateNavbar() {
    const authUser = await fetchAuthUserData();
    document.getElementById('navbar-usernameAndRoles').innerText = `${authUser.username} with roles: ${authUser.roles.map(role => role.name.substring(5)).join(' ')}`;
}

async function updateTable() {
    const authUser = await fetchAuthUserData();
    const authUserInfoTable = document.getElementById('authUser-info');
    const authUserRow = document.createElement('tr');
    authUserRow.innerHTML = `
        <td>${authUser.id}</td>
        <td>${authUser.firstName}</td>
        <td>${authUser.lastName}</td>
        <td>${authUser.username}</td>
        <td>${authUser.roles.map(role => role.name.substring(5)).join(' ')}</td>
    `;
    authUserInfoTable.appendChild(authUserRow);
}


