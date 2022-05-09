<?php

require_once '../../config.php';

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    http_response_code(405);
    die('AJAX: This method is not allowed!');
}

$stmt = $con->prepare("
INSERT INTO `dae`(
    `title`,
    `latitude`,
    `longitude`,
    `h24`,
    `exactLocation`,
    `address`,
    `houseNumber`,
    `postalCode`,
    `city`,
    `province`,
    `operativeHours`,
    `notes`,
    `imageId`
)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );");

$stmt->bind_param(
    "sddisssssssss",
    $_title,
    $_latitude,
    $_longitude,
    $_h24,
    $_exactLocation,
    $_address,
    $_houseNumber,
    $_postalCode,
    $_city,
    $_province,
    $_operativeHours,
    $_notes,
    $_imageId,
);

if (
    !isset($_POST["title"]) || empty($_POST["title"]) ||
    !isset($_POST["latitude"]) || empty($_POST["latitude"]) ||
    !isset($_POST["longitude"]) || empty($_POST["longitude"])
) {
    http_response_code(400);
    die('AJAX: Required fields are missing!');
}

if (
    $_POST["h24"] < 0 || $_POST["h24"] > 1
) {
    http_response_code(400);
    die('AJAX: Required fields are missing!');
}

// ASSIGN VALUES
$_title = htmlspecialchars($_POST["title"]);
$_latitude = htmlspecialchars($_POST["latitude"]);
$_longitude = htmlspecialchars($_POST["longitude"]);
$_h24 = htmlspecialchars($_POST["h24"]);

$_exactLocation = (
    isset($_POST["exactLocation"]) && !empty($_POST["exactLocation"]) ? htmlspecialchars($_POST["exactLocation"]) : null
);

$_address = (
    isset($_POST["address"]) && !empty($_POST["address"]) ? htmlspecialchars($_POST["address"]) : null
);

$_houseNumber = (
    isset($_POST["houseNumber"]) && !empty($_POST["houseNumber"]) ? htmlspecialchars($_POST["houseNumber"]) : null
);

$_postalCode = (
    isset($_POST["postalCode"]) && !empty($_POST["postalCode"]) ? htmlspecialchars($_POST["postalCode"]) : null
);

$_city = (
    isset($_POST["city"]) && !empty($_POST["city"]) ? htmlspecialchars($_POST["city"]) : null
);

$_province = (
    isset($_POST["province"]) && !empty($_POST["province"]) ? htmlspecialchars($_POST["province"]) : null
);

$_operativeHours = (
    isset($_POST["operativeHours"]) && !empty($_POST["operativeHours"]) ? htmlspecialchars($_POST["operativeHours"]) : null
);

$_notes = (
    isset($_POST["notes"]) && !empty($_POST["notes"]) ? htmlspecialchars($_POST["notes"]) : null
);

if (isset($_FILES["coverImage"]["name"]))
{
    $target_dir = "../../api/images/";

    // uuid generation
    $target_file = $target_dir . trim(basename($_FILES["coverImage"]["name"]));
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $target_file_name = $target_dir . uniqid("tmp_") . "." . $imageFileType;

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["coverImage"]["tmp_name"]);
    if($check == false) 
    {
        http_response_code(400);
        die('AJAX: Invalid image mime type: ' . htmlspecialchars($check["mime"]));
    }
  
    // Check file size (max 5 mega)
    if ($_FILES["coverImage"]["size"] > 5000000) 
    {
        http_response_code(400);
        die('AJAX: Invalid image, file exceeds the 5MB limit.');
    }
    
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        http_response_code(400);
        die('AJAX: Invalid image extension, only PNG and JPG/JPEG are allowed');
    }

    if (!move_uploaded_file($_FILES["coverImage"]["tmp_name"], $target_file_name)) 
    {
        http_response_code(500);
        die('AJAX: Upload of the provided image failed. TGT: ' . $target_file_name);
    }

    try {
        $uploaded_file = fopen($target_file_name, "r");
        $imgdata = fread($uploaded_file,filesize($target_file_name));
        fclose($uploaded_file);    

        $uuid = uniqid('img_', true);
        $im = imagecreatefromstring($imgdata);
        imagewebp($im, $target_dir . $uuid . '.webp');
        imagedestroy($im);

        $r = unlink($target_file_name);

        $_imageId = $uuid;
    } catch (Exception $e) {
        http_response_code(500);
        die('AJAX: Conversion from source to webp failed!');
    }

}
else
{
    $_imageId = "";
}

$stmt->execute();

if ($stmt->errno) {
    http_response_code(500);
    die('AJAX: Insert in the database failed with error: ' . $stmt->error);
}

die("AJAX: OK!");