<?php

require_once __DIR__ . '/../database.php';

$stmt = $database->prepare('SELECT * FROM users');
$stmt->execute();

$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
echo json_encode($result);
