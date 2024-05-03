export async function heyServer(callback) {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=hey");
    var data = await response.json();
    callback(data);
}