export async function logoutFromServer() {
    $.ajax({
        type: "POST",
        url: "https://ilaychecks.online/Apps/app5/server/app/server.php",
        data: {
            action: "logout"
        },
        success: function(output) {
            console.log(output);
        },
    });
}