<?php
require_once '../../config.php';

if($_SERVER['REQUEST_METHOD'] != "POST"){
    http_response_code(405);
    die('AJAX: This method is not allowed!');
}

if(!isset($_POST["id"]) || empty($_POST["id"])){
    http_response_code(400);
    die('AJAX: Required fields are missing.');
}

$id = $con->real_escape_string($_POST["id"]);
$tn = $config['DB_TABLE'];

// retrieve image id imageId
$res1 = $con->query("SELECT `imageId` FROM `$tn` WHERE ((`id` = '$id'));");
$row1 = $res1->fetch_assoc();

$res = $con->query("DELETE FROM `$tn` WHERE ((`id` = '$id'));");

if($con->affected_rows > 0){
    unlink("../../api/images/" . $row1["imageId"] . ".webp");
    die('AJAX: OK');
}else{
    http_response_code(404);
    die('AJAX: Customer not found.');
}