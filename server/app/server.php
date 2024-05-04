<?php


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        match ($_GET['action']) {
            'enter' => enter(),
            'hey' => hey(),
            'logout' => logout(),
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


function contact() {
    if (isset($_POST['message']) && strlen($_POST['message']) > 0) {
        $nameAsString = $_SESSION['name'] ?? 'Guest';
        $message = "Hey " . $nameAsString . ", Thank you for contacting us! We will get back to you soon!";
        $data = new stdClass();
        $data->message = $message;
        $json = json_encode($data);
        echo $json;
    } else {
        echo 'Invalid message';
    }
}

function hey() {
    $nameAsString = $_SESSION['name'] ?? 'Guest';
    $message = "Heyyy " . $nameAsString . ' (From the server)!';
    $data = new stdClass();
    $data->message = $message;
    $json = json_encode($data);
    echo $json;
}

function enter() {
    session_start();
    $_SESSION['name'] = "";
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
    if (isset($_POST['name']) && strlen($_POST['name']) > 0) {
        $_SESSION['name'] = $_POST['name'];
        $_SESSION['logged_in'] = true;
        header('Location: /');
    } else {
        echo 'Invalid credentials';
    }
}


$_SESSION['name'] = "admin-Ilay";
$_SESSION['logged_in'] = true;


?>