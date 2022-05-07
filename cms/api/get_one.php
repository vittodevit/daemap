<?php

require_once '../config.php';

if($_SERVER['REQUEST_METHOD'] != "GET"){
    http_response_code(405);
    die('AJAX: This method is not allowed!');
}

$id = $con->real_escape_string($_GET['id']);
$tn = $config['DB_TABLE'];

$res = $con->query("SELECT * FROM `$tn` WHERE `id` = '$id'");

if($con->affected_rows != 1){
    http_response_code(404);
    die('AJAX: Item not found.');
}

$arr = $res->fetch_assoc();
header("Content-Type: application/json");

die(
    json_encode($arr)
);