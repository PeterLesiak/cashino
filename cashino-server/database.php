<?php

require_once __DIR__ . '/config.php';

$database = new mysqli(
    DATABASE_HOSTNAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME
);
