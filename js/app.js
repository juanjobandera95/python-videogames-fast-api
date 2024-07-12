document.addEventListener('DOMContentLoaded', function() {
    loadGames();

    document.getElementById('create-game-btn').addEventListener('click', function() {
        openGameModal();
    });

    document.getElementById('saveGameBtn').addEventListener('click', function() {
        saveGame();
    });

    $('#gameModal').on('hidden.bs.modal', function() {
        clearGameForm();
    });
});

function loadGames() {
    fetch('http://127.0.0.1:8000/games/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#games-table tbody');
            tableBody.innerHTML = '';

            data.forEach(game => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${game.id}</td>
                    <td>${game.title}</td>
                    <td>${game.genre}</td>
                    <td>${game.release_date}</td>
                    <td>${game.developer}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="viewGame(${game.id})">View</button>
                        <button class="btn btn-warning btn-sm" onclick="editGame(${game.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmDeleteGame(${game.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function openGameModal(game = null) {
    if (game) {
        document.getElementById('gameId').value = game.id;
        document.getElementById('gameTitle').value = game.title;
        document.getElementById('gameGenre').value = game.genre;
        document.getElementById('gameReleaseDate').value = game.release_date;
        document.getElementById('gameDeveloper').value = game.developer;
    }

    $('#gameModal').modal('show');
}

function clearGameForm() {
    document.getElementById('gameId').value = '';
    document.getElementById('gameForm').reset();
}

function saveGame() {
    const gameId = document.getElementById('gameId').value;
    const game = {
        title: document.getElementById('gameTitle').value,
        genre: document.getElementById('gameGenre').value,
        release_date: document.getElementById('gameReleaseDate').value,
        developer: document.getElementById('gameDeveloper').value,
    };

    const method = gameId ? 'PUT' : 'POST';
    const url = gameId ? `http://127.0.0.1:8000/games/${gameId}` : 'http://127.0.0.1:8000/games/';

    fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        })
        .then(response => response.json())
        .then(() => {
            $('#gameModal').modal('hide');
            loadGames();
        });
}

function viewGame(id) {
    fetch(`http://127.0.0.1:8000/games/${id}`)
        .then(response => response.json())
        .then(game => {
            document.getElementById('gameDetails').innerHTML = `
                <p><strong>Title:</strong> ${game.title}</p>
                <p><strong>Genre:</strong> ${game.genre}</p>
                <p><strong>Release Date:</strong> ${game.release_date}</p>
                <p><strong>Developer:</strong> ${game.developer}</p>
            `;
            $('#viewDeleteModal').modal('show');
        });
}

function editGame(id) {
    fetch(`http://127.0.0.1:8000/games/${id}`)
        .then(response => response.json())
        .then(game => {
            openGameModal(game);
        });
}

function confirmDeleteGame(id) {
    document.getElementById('gameDetails').innerHTML = `
        <p>Are you sure you want to delete this game?</p>
        <button class="btn btn-danger" onclick="deleteGame(${id})">Delete</button>
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    `;
    $('#viewDeleteModal').modal('show');
}

function deleteGame(id) {
    fetch(`http://127.0.0.1:8000/games/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            $('#viewDeleteModal').modal('hide');
            loadGames();
        });
}