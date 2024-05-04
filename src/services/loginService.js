export async function loginToServer(name) {
    $.ajax({
        type: "POST",
        url: "https://ilaychecks.online/Apps/app5/server/app/server.php",
        data: {
            action: "login",
            name: name
        },
        success: function(output) {
            // Nothing...
        },
    });
}
