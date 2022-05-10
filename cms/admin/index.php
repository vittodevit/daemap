<?php
$site_adress = (((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
$whole_url = $site_adress . $_SERVER['REQUEST_URI'];


$pos = strpos($whole_url, "?");
$changed_url = FALSE;
if ($pos !== FALSE && $whole_url[$pos - 1] != "/") {
    $whole_url = substr_replace($whole_url, "/", $pos, 0);
    $changed_url = TRUE;
} else if ($pos == FALSE && substr($whole_url, -1) != '/') {
    $whole_url = $whole_url . "/";
    $changed_url = TRUE;
}
if ($changed_url) {
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: " . $whole_url);
    exit();
}
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Backoffice mappa DAE</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css" integrity="sha384-ejwKkLla8gPP8t2u0eQyL0Q/4ItcnyveF505U0NIobD/SMsNyXrLti6CWaD0L52l" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.min.css" integrity="sha384-yT2pwyD9a3Oee/HtjWTccnRmchDWH2EDHjzH7gwf8yAK0RilKFL164FCHX9fzlxh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha384-R334r6kryDNB/GWs2kfB6blAOyWPCxjdHSww/mo7fel+o5TM/AOobJ0QpGRXSDh4" crossorigin="anonymous">
    <link href="./assets/styles.css" rel="stylesheet" />
</head>

<body>

    <div class="modal fade" id="createModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nuovo DAE</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="nscB1">
                        <form>
                            <div class="row">
                                <div class="col">
                                    <label for="title" class="form-label">Titolo</label>
                                    <input type="text" class="form-control" id="title" required>
                                </div>
                                <div class="col">
                                    <label for="coverImage" class="form-label">Immagine di copertina</label>
                                    <input class="form-control" type="file" id="coverImage">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col">
                                    <label for="latitude">Latitudine</label>
                                    <input type="text" class="form-control" id="latitude" required>
                                </div>
                                <div class="col">
                                    <label for="longitude">Longitudine</label>
                                    <input type="text" class="form-control" id="longitude" required>
                                </div>
                            </div>
                            <br>
                            <div class="mb-3">
                                <label for="exactLocation" class="form-label">Ubicazione esatta</label>
                                <input type="text" class="form-control" id="exactLocation">
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="h24">H24?</label>
                                    <select id="h24" class="form-select">
                                        <option value="1">H24</option>
                                        <option value="0">Personalizzato</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="operativeHours">Ore di operatività</label>
                                    <input type="text" class="form-control" id="operativeHours">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col col-md-8">
                                    <label for="address">Indirizzo</label>
                                    <input type="text" class="form-control" id="address">
                                </div>
                                <div class="col col-md-2">
                                    <label for="houseNumber">Civico</label>
                                    <input type="text" class="form-control" id="houseNumber">
                                </div>
                                <div class="col col-md-2">
                                    <label for="postalCode">C.A.P.</label>
                                    <input type="text" class="form-control" id="postalCode">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col">
                                    <label for="city">Città</label>
                                    <input type="text" class="form-control" id="city">
                                </div>
                                <div class="col">
                                    <label for="province">Provincia</label>
                                    <input type="text" class="form-control" id="province">
                                </div>
                            </div>
                            <br>
                            <div class="mb-3">
                                <label for="notes" class="form-label">Annotazioni</label>
                                <textarea class="form-control" id="notes" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-octagon"></i>
                        Annulla
                    </button>
                    <button type="button" class="btn btn-success" onclick="createCustomerAJAX()">
                        <i class="bi bi-plus-square"></i>
                        Crea
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eliminazione DAE</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Sei sicuro di voler eliminare il DAE?
                    <br>
                    ID: <strong id="deleteModalBody"></strong>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-octagon"></i>
                        Annulla
                    </button>
                    <button type="button" class="btn btn-danger" onclick="deleteAJAX(document.getElementById('deleteModalBody').textContent)">
                        <i class="bi bi-trash"></i>
                        Elimina
                    </button>
                </div>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Backoffice mappa DAE</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample02">
                <ul class="navbar-nav me-auto">
                </ul>
                <button type="button" class="btn btn-primary" id="btn-aggiorna">
                    <i class="bi bi-arrow-clockwise"></i>
                    Aggiorna Lista
                </button>
                <span class="spacer"></span>
                <button type="button" class="btn btn-success"
                data-bs-toggle="modal" data-bs-target="#createModal"
                >
                    <i class="bi bi-plus-square"></i>
                    Nuovo DAE
                </button>
                <span class="spacer"></span>
                <a type="button" class="btn btn-danger" href="api/logout.php">
                    <i class="bi bi-box-arrow-left"></i>
                    Esci
                </a>
            </div>
        </div>
    </nav>

    <div class="table-container">
        <table id="main-table">
            <thead>
                <th>
                <td>Id</td>
                <td>Titolo</td>
                <td>Collocazione precisa</td>
                <td>Latitudine</td>
                <td>Longitudine</td>
                <td>H24?</td>
                <td>Azioni</td>
                </th>
            </thead>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js" integrity="sha384-JQOveGFp+ebVxM94coUF7x6YiAUYRPGJb1VhPi3xz7/Uv36AewFNY2AS5PxQh7Vz" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/plug-ins/1.11.4/dataRender/ellipsis.js" integrity="sha384-4uIIT6u5kKwEHfqykzSq4+hVuAfYMKTHfFOsd+0E4wH9Xq6eS6BBIMBuuLZVerr/" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha384-Si3HKTyQYGU+NC4aAF3ThcOSvK+ZQiyEKlYyfjiIFKMqsnCmfHjGa1VK1kYP9UdS" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <script src="./assets/admin.js"></script>
</body>

</html>