<?php
session_start();  // Start the session at the beginning of the script

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        match ($_GET['action']) {
            'enter' => enter(),
            'hey' => hey(),
            'logout' => logout(),
            'getUsername' => getUsername(),
            'getNotes' => getNotes(),
            'getNickname' => getNickname(),
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

function getNickname() {
    $nicknameAsString = isset($_COOKIE['nickname']) ? htmlspecialchars($_COOKIE['nickname']) : strrev('Guest');
    $data = new stdClass();
    $data->nickname = $nicknameAsString;
    $json = json_encode($data);
    echo $json;
}

function getNotes() {
    $notes = isset($_COOKIE['notes']) ? $_COOKIE['notes'] : [];
    $data = new stdClass();
    $data->notes = $notes;
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
    if (isset($_COOKIE['nickname'])) {
        //unset($_COOKIE['nickname']); // Optional: unset the cookie from the superglobal
        setcookie('nickname', '', time() - 3600, "/");
    }
    session_destroy();
    session_start(); // Restart the session to clear data
    session_regenerate_id(true); // Regenerate to a new ID for security
    
    // Redirect to home page or login page
    header('Location: /');
    exit; // Ensure no further execution of script after redirection
}


function login() {
    if (isset($_POST['username']) && strlen($_POST['username']) > 0) {
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['logged_in'] = true;
        setcookie('nickname', strrev($_SESSION['username']), time() + 60 * 60 * 24 * 30, '/');
        header('Location: /');
        exit();  // Make sure to exit after header redirect to stop script execution
    } else {
        echo 'Invalid credentials';
    }
}

session_get_cookie_params();

?>
