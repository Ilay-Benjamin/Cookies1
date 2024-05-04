export async function getUsername(callback) {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=getUsername");
    var data = await response.json();
    callback(data);
}