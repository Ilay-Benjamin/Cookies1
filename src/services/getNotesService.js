export async function getNotes(callback) {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=getNotes");
    var data = await response.json();
    callback(data);
}