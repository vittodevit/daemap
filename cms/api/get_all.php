<?php

require_once '../config.php';

if($_SERVER['REQUEST_METHOD'] != "GET"){
    http_response_code(405);
    die('AJAX: This method is not allowed!');
}

$tn = $config['DB_TABLE'];
$arr = array();
$res = $con->query("SELECT `id`, `title`, `latitude`, `longitude`, `h24` FROM `$tn`");

while
(
    $row = $res->fetch_assoc()
){
    array_push($arr, $row);
}
 
header("Content-Type: application/json");

die(
    json_encode($arr)
);