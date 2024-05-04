export async function logoutFromServer() {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=logout");
}