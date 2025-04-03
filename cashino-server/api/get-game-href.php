<?php

require_once __DIR__ . '/../database.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$gameId = $input['gameId'] ?? null;

if (!$gameId) {
    $result = ['success' => false, 'errorField' => 'gameId', 'errorMessage' => 'Game ID is requierd'];
    echo json_encode($result);

    exit;
}

$stmt = $database->prepare('SELECT href FROM games WHERE id = ?');
$stmt->bind_param('i', $gameId);
$stmt->execute();

$href = $stmt->get_result()->fetch_assoc()['href'];

if (!$href) {
    $result = ['success' => false, 'errorField' => 'gameId', 'errorMessage' => 'Game ID is invalid'];
    echo json_encode($result);

    exit;
}

$result = ['success' => true, 'href' => $href];
echo json_encode($result);
