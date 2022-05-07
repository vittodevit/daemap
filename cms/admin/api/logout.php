<?php

require_once '../../config.php';

$cfa = $config["CF_DOMAIN"];
header("Location: https://$cfa.cloudflareaccess.com/cdn-cgi/access/logout");