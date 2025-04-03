<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$email = $input['email'] ?? null;
$password = $input['password'] ?? null;

if (!$email) {
    $result = ['success' => false, 'errorField' => 'email', 'errorMessage' => 'Email is required'];
    echo json_encode($result);

    exit;
}

if (!$password) {
    $result = ['success' => false, 'errorField' => 'password', 'errorMessage' => 'Password is required'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('SELECT * FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();

$user = $stmt->get_result()->fetch_assoc();

if (!$user) {
    $result = ['success' => false, 'errorField' => 'email', 'errorMessage' => 'Invalid email'];
    echo json_encode($result);

    exit;
}

if (!password_verify($password, $user['password'])) {
    $result = ['success' => false, 'errorField' => 'password', 'errorMessage' => 'Invalid password'];
    echo json_encode($result);

    exit;
}

$result = ['success' => true, 'userId' => $user['id']];
echo json_encode($result);
