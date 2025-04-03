<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$userId = $input['userId'] ?? null;
$expiresAt = $input['expiresAt'] ?? null;

if (!$userId) {
    $result = ['success' => false, 'errorField' => 'userId', 'errorMessage' => 'User ID is required'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('SELECT * FROM users WHERE id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();

$userExists = $stmt->get_result()->num_rows > 0;

if (!$userExists) {
    $result = ['success' => false, 'errorField' => 'userId', 'errorMessage' => 'Invalid user ID'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('INSERT INTO sessions VALUES (NULL, ?, ?)');
$stmt->bind_param('is', $userId, $expiresAt);
$stmt->execute();

$stmt = $database->prepare('SELECT id FROM sessions WHERE userId = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();

$sessionId = $stmt->get_result()->fetch_assoc()['id'];

$result = ['success' => true, 'sessionId' => $sessionId];
echo json_encode($result);
