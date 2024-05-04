<?php
session_start();  // Start the session at the beginning of the script

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        match ($_GET['action']) {
            'enter' => enter(),
            'hey' => hey(),
            'logout' => logout(),
            'getUsername' => getUsername(),
            default => die('Invalid action'),
        };
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        match ($_POST['action']) {
            'login' => login(),
            'contact' => contact(),
            default => die('Invalid action'),
        };
    }
}

function getUsername() {
    $usernameAsString = isset($_COOKIE['username']) ? htmlspecialchars($_COOKIE['username']) : 'Guest';
    $data = new stdClass();
    $data->username = $usernameAsString;
    $json = json_encode($data);
    echo $json;
}

function contact() {
    if (isset($_POST['message']) && strlen($_POST['message']) > 0) {
        $usernameAsString = isset($_SESSION['username']) && strlen($_SESSION['username']) > 0 ? $_SESSION['username'] : 'Guest';
        $message = "Hey " . $usernameAsString . ", Thank you for contacting us! We will get back to you soon!";
        $data = new stdClass();
        $data->message = $message;
        $json = json_encode($data);
        echo $json;
    } else {
        echo 'Invalid message';
    }
}

function hey() {
    $usernameAsString = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
    $message = "Heyyy " . $usernameAsString . ' (From the server)!';
    $data = new stdClass();
    $data->message = $message;
    $json = json_encode($data);
    echo $json;
}

function enter() {
    $_SESSION['username'] = "";
    $_SESSION['logged_in'] = false;
    $data = new stdClass();
    $data->message="Welcome to Ilay's website!";
    $json = json_encode($data);
    echo $json;
}

function logout() {
    session_destroy();
    session_start();  // Restart the session to clear data
    session_regenerate_id(true);  // Regenerate to a new ID for security
    header('Location: /');
}

function login() {
    if (isset($_POST['username']) && strlen($_POST['username']) > 0) {
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['logged_in'] = true;
        header('Location: /');
        exit();  // Make sure to exit after header redirect to stop script execution
    } else {
        echo 'Invalid credentials';
    }
}

session_get_cookie_params();

?>
