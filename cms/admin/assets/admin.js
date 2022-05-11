let dt = null;

// caricamento dati nel modal
var deleteModal = document.getElementById('deleteModal');
var createModal = document.getElementById('createModal');
deleteModal.addEventListener('show.bs.modal', function(event) {
    var button = event.relatedTarget;
    var modalContent = document.getElementById('deleteModalBody');
    modalContent.textContent = button.getAttribute('data-bs-dmUuid');;
});

function tabellaAJAX() {
  // richiesta GET per ottenere tutte le righe
  $.ajax({
    type: "GET",
    url: "./api/get_all.php",
    data: {},
    success: function (data) {
      // dati ottenuti, aggiorniamo la tabella
      buildTable(data);
    },
    // mostra notifica toast rossa con errore
    error: function (data) {
      toastr.error(data);
    },
  });
}

// funzione chiamata dal pulsante di conferma eliminazione
function deleteAJAX(uuid){
  $.ajax({
      type: "POST",
      url: "./api/delete.php",
      data: {
          "id": uuid
      },
      success: function(data) {
          // dati ottenuti, aggiorniamo la tabella
          $('#deleteModal').modal('hide');
          tabellaAJAX();
      },
      // mostra notifica toast rossa con errore
      error: function(data) {
          toastr.error(data.responseJSON.payload);
      }
  });
}

function createAJAX() {
  $.ajax({
      type: "POST",
      url: './api/create.php',
      data: new FormData($('#nscB1')[0]), // The form with the file inputs.
      processData: false,
      contentType: false,
      success: function (data) {
          tabellaAJAX();
          $('#createModal').modal('hide');
          $('#nscB1')[0].reset();
          toastr.success("DAE creato correttamente!");
      },
      error: function (data) {
          toastr.error(data.responseText);
      }
  });
}

// dato un UUID costruisce gli elementi DOM della toolbar azioni sulla tabella
function buildActionToolbar(uuid) {
  return `
      <button class="btn btn-primary btn-sm"
      data-bs-toggle="modal" data-bs-target="#editModal" data-bs-emUuid="${uuid}">
          <i class="bi bi-pencil"></i>
      </button>
      <button class="btn btn-danger btn-sm"
      data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-dmUuid="${uuid}">
          <i class="bi bi-trash"></i>
      </button>
  `;
}

function convertH24(h24){
  if(h24 == 1){
    return `
      <b class="green">H24</b>
    `
  }else{
    return `
      <b class="red">NON H24</b>
    `
  }
}

// costruisce ed inserisce una riga nella tabella
function buildTableRow(jobject) {
  // riordiniamo array
  dt.row.add([
    null,
    jobject["id"], // uuid
    jobject["title"], // title
    jobject["exactLocation"], // collocaz.
    jobject["latitude"], // lat
    jobject["longitude"], // lon
    convertH24(
      // toolbar azioni
      jobject["h24"]
    ), // h24
    buildActionToolbar(
      // toolbar azioni
      jobject["id"]
    ),
  ]);
}

//build tabella da array json
function buildTable(jsonData) {
  // ripulisce la tabella
  dt.clear();
  jsonData.forEach((jelement) => {
    // per ogni item dell'array aggiungi riga
    buildTableRow(jelement);
  });
  // renderizza la tabella
  dt.draw();
}

// attiva datatable sulla tabella
$(document).ready(function () {
  dt = $("#main-table").DataTable({
    paging: true,
    searching: true,
    order: [
      [2, "asc"], // ordinamento ascendente sul titolo
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Italian.json",
    },
    "columnDefs": [
      // nascondi la colonna PK che non è usata
      {
        "targets": [0],
        "visible": false,
        "searchable": false
      },
      { 
        "width": "25%", 
        "targets": 2 
      },
      { 
        "width": "8%", 
        "orderable": false,
        "searchable": false,
        "targets": [4, 5, 7]
      },
      { 
        "width": "6%", 
        "targets": [6]
      },
      { 
        "width": "3%", 
        "targets": [1]
      },
      // riduci il testo nelle colonne 'User Agent' e 'Messaggio'
      /*{
          targets: 4,
          render: $.fn.dataTable.render.ellipsis(17)
      },
      {
          targets: 8,
          render: $.fn.dataTable.render.ellipsis(17, true)
      }*/
    ]
  });
  tabellaAJAX();
});

// listener pulsante di lettura dati
$("#btn-aggiorna").click(function () {
  tabellaAJAX();
});

//listener aggiornamento field h24
$('#h24').on('change', function() {
  console.log($("#h24").val());
  if($("#h24").val() === "1"){
    $( "#operativeHours" ).prop( "disabled", true );
  }else{
    $( "#operativeHours" ).prop( "disabled", false );
  }
});

$( "#operativeHours" ).prop( "disabled", true );