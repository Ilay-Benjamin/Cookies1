export async function getNickname(callback) {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=getNickname");
    var data = await response.json();
    callback(data);
}