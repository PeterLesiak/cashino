<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$userId = $input['userId'] ?? null;
$firstName = $input['firstName'] ?? null;
$lastName = $input['lastName'] ?? null;
$phoneNumber = $input['phoneNumber'] ?? null;
$PESEL = $input['PESEL'] ?? null;
$bankAccountNumber = $input['bankAccountNumber'] ?? null;
$email = $input['email'] ?? null;
$password = $input['password'] ?? null;

if (!$userId) {
    $result = ['success' => false, 'errorField' => 'userId', 'errorMessage' => 'User ID is required'];
    echo json_encode($result);

    exit;
}

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

$stmt = $database->prepare('SELECT * FROM users WHERE id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();

$userExists = $stmt->get_result()->num_rows > 0;

if (!$userExists) {
    $result = ['success' => false, 'errorField' => 'userId', 'errorMessage' => 'User ID is invalid'];
    echo json_encode($result);

    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $database->prepare('
UPDATE users
SET 
    firstName = ?,
    lastName = ?,
    phoneNumber = ?,
    PESEL = ?,
    bankAccountNumber = ?,
    email = ?,
    password = ?
WHERE id = ?
');
$stmt->bind_param('sssssssi', $firstName, $lastName, $phoneNumber, $PESEL, $bankAccountNumber, $email, $passwordHash, $userId);
$stmt->execute();

$result = ['success' => true];
echo json_encode($result);
