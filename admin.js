// admin.js: Handles admin login, movie insert, and display

// Simple hardcoded admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const loginForm = document.getElementById('admin-login-form');
const movieForm = document.getElementById('movie-form');
const movieList = document.getElementById('movie-list');

// Use localStorage to persist movies
function getMovies() {
    return JSON.parse(localStorage.getItem('adminMovies') || '[]');
}
function setMovies(movies) {
    localStorage.setItem('adminMovies', JSON.stringify(movies));
}

// Render movies in gold/black style
function renderMovies() {
    const movies = getMovies();
    movieList.innerHTML = '';
    movies.forEach((movie, idx) => {
        let imgSrc = movie.img;
        // If not base64, fallback to resource path
        if (!imgSrc.startsWith('data:image')) {
            imgSrc = `./resource/movies/${imgSrc}.png`;
        }
        movieList.innerHTML += `
        <div class="moviedetails" data-idx="${idx}">
            <img class="movimg" src="${imgSrc}" alt="${movie.title}">
            <div class="details">
                <div class="playbtn">
                    <a href="${movie.link}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffd700" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>
                    </a>
                </div>
                <p><b>${movie.title}</b></p>
                <p>${movie.runtime}</p>
                <div class="ratings">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/><span> ${movie.rating}</span></svg>
                </div>
                <p>Price: <b>₹${movie.price}</b></p>
                <button class="edit-movie-btn" style="background:#FFD700;color:#111;margin-right:8px;">Edit</button>
                <button class="delete-movie-btn" style="background:#111;color:#FFD700;border:1px solid #FFD700;">Delete</button>
            </div>
        </div>
        `;
    });
    addMovieActionListeners();
}

function addMovieActionListeners() {
    // Delete
    document.querySelectorAll('.delete-movie-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.closest('.moviedetails').getAttribute('data-idx');
            const movies = getMovies();
            if (confirm('Are you sure you want to delete this movie?')) {
                movies.splice(idx, 1);
                setMovies(movies);
                renderMovies();
            }
        };
    });
    // Edit
    document.querySelectorAll('.edit-movie-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.closest('.moviedetails').getAttribute('data-idx');
            const movies = getMovies();
            const movie = movies[idx];
            // Fill form with movie data
            document.getElementById('title').value = movie.title;
            document.getElementById('runtime').value = movie.runtime;
            document.getElementById('rating').value = movie.rating;
            document.getElementById('img').value = movie.img;
            document.getElementById('link').value = movie.link;
            document.getElementById('price').value = movie.price;
            movieForm.setAttribute('data-edit-idx', idx);
            movieForm.scrollIntoView({behavior:'smooth'});
        };
    });
}

// Login logic
loginForm.onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        loginForm.style.display = 'none';
        movieForm.style.display = 'block';
        renderMovies();
    } else {
        alert('Invalid admin credentials!');
    }
};

// Add movie logic
movieForm.onsubmit = async function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('img');
    const file = fileInput.files[0];
    if (!file || file.type !== 'image/png') {
        alert('Please upload a PNG image.');
        return;
    }
    // Read file as base64
    const reader = new FileReader();
    reader.onload = function(event) {
        const base64Image = event.target.result;
        const movie = {
            title: document.getElementById('title').value,
            runtime: document.getElementById('runtime').value,
            rating: document.getElementById('rating').value,
            img: base64Image, // store base64 string
            link: document.getElementById('link').value,
            price: document.getElementById('price').value
        };
        let movies = getMovies();
        const editIdx = movieForm.getAttribute('data-edit-idx');
        if (editIdx !== null) {
            movies[editIdx] = movie;
            movieForm.removeAttribute('data-edit-idx');
        } else {
            movies.push(movie);
        }
        setMovies(movies);
        renderMovies();
        movieForm.reset();
    };
    reader.readAsDataURL(file);
};

// If already logged in (for demo, not secure)
if (sessionStorage.getItem('adminLoggedIn')) {
    loginForm.style.display = 'none';
    movieForm.style.display = 'block';
    renderMovies();
}
