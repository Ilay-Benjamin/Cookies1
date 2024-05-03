<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        match ($params['action']) {
            'enter' => enter(),
            'hey' => hey(),
            default => die('Invalid action'),
        };
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        match ($params['action']) {
            'logout' => logout(),
            'login' => login(),
            default => die('Invalid action'),
        };
    }
}





function hey() {
    $usernameAsString = $_SESSION['username'] ?? 'Guest';
    $message = "Heyyy " . $usernameAsString . ' (From the server)!';
    $data = new stdClass();
    $data->message = $message;
    $json = json_encode($data);
    echo $json;
}

function enter() {
    session_start();
    $_SESSION['username'] = "";
    $_SESSION['logged_in'] = false;
    $data = new stdClass();
    $data->message="Welcome to Ilay's website!";
    $json = json_encode($data);
    echo $json;
}

function logout() {
    session_destroy();
    header('Location: /');
}

function login() {
    if (isset($_POST['username']) && strlen($_POST['username']) > 0) {
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['logged_in'] = true;
        header('Location: /');
    } else {
        echo 'Invalid credentials';
    }
}


$_SESSION['username'] = "admin-Ilay";
$_SESSION['logged_in'] = true;


?>