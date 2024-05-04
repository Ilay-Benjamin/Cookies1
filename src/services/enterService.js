export async function enterToApp(callback) {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=enter");
    var data = await response.json();
    callback(data);
}