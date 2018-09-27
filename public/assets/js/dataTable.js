$(document).ready(function() {
    $('#dataTable').dataTable( {
        "ajax": "./assets/json/dataPeserta.json",
        "columns": [
            { "data": "nama" },
            { "data": "nim" },
            { "data": "tglLahir" },
            { "data": "jurusan" },
            { "data": "angkatan" },
            { "data": "noHp" },
            { "data": "alasan" },
            { "data": "komitmen" }
        ]
    });
});