$(document).ready(function() {
    var table = $('#gamesTable').DataTable({
        ajax: {
            url: 'http://localhost:8000/games/',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'genre' },
            { data: 'platform' },
            { data: 'year' },
            {
                data: null,
                className: 'center',
                defaultContent: '<button class="btn btn-danger btn-sm deleteBtn">Delete</button>'
            }
        ]
    });

    $('#gamesTable tbody').on('click', 'button.deleteBtn', function() {
        var data = table.row($(this).parents('tr')).data();
        $('#confirmModal').modal('show');

        $('#confirmBtn').off('click').on('click', function() {
            $.ajax({
                url: 'http://localhost:8000/games/' + data.id,
                method: 'DELETE',
                success: function(response) {
                    $('#confirmModal').modal('hide');
                    table.ajax.reload();
                }
            });
        });
    });
});