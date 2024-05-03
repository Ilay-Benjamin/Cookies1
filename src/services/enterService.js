export async function enter() {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=enter");
    var data = await response.json();
    var message = data.message;
    addMessage(message);
}