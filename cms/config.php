<?php
$config = array(
    "DB_HOST"   => "10.8.0.1",
    "DB_USER"   => "root",
    "DB_PASS"   => "root",
    "DB_NAME"   => "nextcloud",
    "DB_TABLE"  => "dae",
    "CF_DOMAIN" => "mrbackslash-infranode",
);

$con = new mysqli($config["DB_HOST"], $config["DB_USER"], $config["DB_PASS"], $config["DB_NAME"]);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}