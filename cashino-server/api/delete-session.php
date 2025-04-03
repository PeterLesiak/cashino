<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$sessionId = $input['sessionId'] ?? null;
$userId = $input['userId'] ?? null;

if (!$sessionId) {
    $result = ['success' => false, 'errorField' => 'sessionId', 'errorMessage' => 'Session ID is required'];
    echo json_encode($result);

    exit;
}

if (!$userId) {
    $result = ['success' => false, 'errorField' => 'userId', 'errorMessage' => 'User ID is required'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('SELECT * FROM sessions WHERE id = ?');
$stmt->bind_param('i', $sessionId);
$stmt->execute();

$session = $stmt->get_result()->fetch_assoc();

if (!$session) {
    $result = ['success' => false, 'errorField' => 'sessionId', 'errorMessage' => 'Invalid session ID'];
    echo json_encode($result);

    exit;
}

if ($session['userId'] != $userId) {
    $result = ['success' => false, 'errorField' => 'userId', 'errorMessage' => 'Invalid user ID'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('DELETE FROM sessions WHERE id = ?');
$stmt->bind_param('i', $sessionId);
$stmt->execute();

$result = ['success' => true];
echo json_encode($result);
