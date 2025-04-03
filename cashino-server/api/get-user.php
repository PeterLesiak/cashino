<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$sessionId = $input['sessionId'] ?? null;

if (!$sessionId) {
    $result = ['success' => false, 'errorField' => 'sessionId', 'errorMessage' => 'Session ID is required'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('SELECT userId FROM sessions WHERE id = ?');
$stmt->bind_param('i', $sessionId);
$stmt->execute();

$userId = $stmt->get_result()->fetch_assoc()['userId'];

if (!$userId) {
    $result = ['success' => false, 'errorField' => 'sessionId', 'errorMessage' => 'Invalid session ID'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('SELECT * FROM users WHERE id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();

$user = $stmt->get_result()->fetch_assoc();

$result = ['success' => true, 'user' => $user];
echo json_encode($result);
