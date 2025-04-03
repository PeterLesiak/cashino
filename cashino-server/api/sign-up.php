<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$firstName = $input['firstName'] ?? null;
$lastName = $input['lastName'] ?? null;
$phoneNumber = $input['phoneNumber'] ?? null;
$PESEL = $input['PESEL'] ?? null;
$bankAccountNumber = $input['bankAccountNumber'] ?? null;
$email = $input['email'] ?? null;
$password = $input['password'] ?? null;

if (!$firstName) {
    $result = ['success' => false, 'errorField' => 'firstName', 'errorMessage' => 'First name is required'];
    echo json_encode($result);

    exit;
}

if (!$lastName) {
    $result = ['success' => false, 'errorField' => 'lastName', 'errorMessage' => 'Last name is required'];
    echo json_encode($result);

    exit;
}

if (!$PESEL) {
    $result = ['success' => false, 'errorField' => 'PESEL', 'errorMessage' => 'PESEL is required'];
    echo json_encode($result);

    exit;
}

if (!$bankAccountNumber) {
    $result = ['success' => false, 'errorField' => 'bankAccountNumber', 'errorMessage' => 'Bank account number is required'];
    echo json_encode($result);

    exit;
}

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

$emailExists = $stmt->get_result()->num_rows > 0;

if ($emailExists) {
    $result = ['success' => false, 'errorField' => 'email', 'errorMessage' => 'Email already exists'];
    echo json_encode($result);

    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $database->prepare('INSERT INTO users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, 0)');
$stmt->bind_param('sssssss', $firstName, $lastName, $phoneNumber, $PESEL, $bankAccountNumber, $email, $passwordHash);
$stmt->execute();

$stmt = $database->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$userId = $stmt->get_result()->fetch_assoc()['id'];

$result = ['success' => true, 'userId' => $userId];
echo json_encode($result);
