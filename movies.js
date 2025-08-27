//Recommended Movies list
let movies = [{
    title: "The Shawshank Redemption 1994",
    runtime:"2h 22m",
    rating:"9.3",
    img:"shawshank",
    link:"https://youtu.be/PLl99DlL6b4?si=QVnUtBQ-LV-NBhms",
    price: 200
},
{
    title: "The Godfather 1972",
    runtime:"2h 55m",
    rating:"9.2",
    img:"godfather1",
    link:"https://youtu.be/UaVTIH8mujA?si=mxcsqdbLXryiWwYK",
    price: 250
},
{
    title: "The Dark Knight 2008",
    runtime:"2h 32m",
    rating:"9.0",
    img:"darkknight",
    link:"https://youtu.be/GokKUqLcvD8?si=NmfhXhiRDmMZuFYw",
    price: 220
},
{
    title: "The Godfather Part II 1974",
    runtime:"3h 22m",
    rating:"9.0",
    img:"godfather2",
    link:"https://youtu.be/9O1Iy9od7-A?si=YEc1lzDwzWhl_FOK",
    price: 250
},
{
    title: "12 Angry Men 1957",
    runtime:"1h 36m",
    rating:"9.0",
    img:"angrymen",
    link:"https://youtu.be/TEN-2uTi2c0?si=HA2V7bYfcqG4R7Rq",
    price: 180
},
{
    title: "The Lord of the Rings The Return of the King",
    runtime:"3h 21m",
    rating:"9.0",
    img:"lotr",
    link:"https://youtu.be/r5X-hFf6Bwo?si=OEgm9M_8QU4BO_hy",
    price: 220
},
{
    title: "Schindler's List 1993",
    runtime:"3h 15m",
    rating:"9.0",
    img:"list",
    link:"",
    price: 200
},
{
    title: "Pulp Fiction 1994",
    runtime:"2h 34m",
    rating:"8.9",
    img:"pulp",
    link:"",
    price: 180
},
{
    title: "The lord of the Rings The Fellowship of the Ring 2001",
    runtime:"2h 58m",
    rating:"8.9",
    img:"lotr2",
    link:"",
    price: 220
},
{
    title: "The Good,the Bad and the Ugly 1966",
    runtime:"2h 58m",
    rating:"8.8",
    img:"GBU",
    link:"",
    price: 200
},{
    title: "Forrest Gump 1994",
    runtime:"2h 22m",
    rating:"8.8",
    img:"forest",
    link:"",
    price: 200
},
{
    title: "The lord of the Rings The Two Towers 2002",
    runtime:"2h 59m",
    rating:"8.8",
    img:"lotr3",
    link:"",
    price: 220
}]

// Load admin-added movies from localStorage and merge with hardcoded movies
let adminMovies = [];
try {
    adminMovies = JSON.parse(localStorage.getItem('adminMovies')) || [];
} catch (e) {
    adminMovies = [];
}
// Merge admin movies (if any) with hardcoded movies
// Admin movies first, then hardcoded
let allMoviesToShow = [...adminMovies, ...movies];

let html = "";
allMoviesToShow.forEach((movie) => {
    let imgSrc = movie.img;
    // If admin image is base64, use it, else fallback to resource path
    if (!imgSrc.startsWith('data:image')) {
        imgSrc = `./resource/movies/${imgSrc}.png`;
    }
    html = html + `
    <div class="moviedetails">
        <img  class="movimg" src="${imgSrc}">
        <div class="details">
            <div class="playbtn">
                <a href="${movie.link}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffd700" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg></a>
            </div>    
            <p>${movie.title}<p>
            <p>${movie.runtime}</p>
            <div class="ratings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/><span> ${movie.rating}</span></svg>
            </div>
            <button class="bookbtn" data-movie="${movie.title}" data-price="${movie.price}">Book Now</button>
        </div>
    </div>
    `;
});

document.querySelector('.container').innerHTML = html;






//All movies list
const allmovies = [{
    title: "Fight Club 1999",
    runtime:"2h 19m",
    rating:"8.8",
    img:"fightclub",
    price: 200
},
{
    title: "Inception 2010",
    runtime:"2h 28m",
    rating:"8.8",
    img:"inception",
    price: 220
},
{
    title: "Star Wars Episode V The Empire Strikes Back 1980",
    runtime:"2h 4m",
    rating:"8.7",
    img:"swep4",
    price: 250
},
{
    title: "The Matrix 1999",
    runtime:"2h 16m",
    rating:"8.7",
    img:"matrix 1",
    price: 200
},
{
    title: "Goodfellas 1990",
    runtime:"2h 25m",
    rating:"8.7",
    img:"goodfellas",
    price: 200
},
{
    title: "Interstellar 2014",
    runtime:"2h 49m",
    rating:"8.7",
    img:"intersteller",
    price: 220
},
{
    title: "One Flew Over the Cuckoo's Nest 1975",
    runtime:"2h 13m",
    rating:"8.7",
    img:"cukoo",
    price: 200
},
{
    title: "Se7en 1995",
    runtime:"2h 7m",
    rating:"8.6",
    img:"seven",
    price: 200
},
{
    title: "It's a Wonderful Life 1946",
    runtime:"2h 10m",
    rating:"8.6",
    img:"wonderful",
    price: 180
},
{
    title: "The Silence of the Lambs 1991",
    runtime:"1h 58m",
    rating:"8.6",
    img:"silenceofla",
    price: 200
},
{
    title: "Seven Samurai 1954",
    runtime:"3h 27m",
    rating:"8.6",
    img:"samurai",
    price: 200
},
{
    title: "Saving Private Ryan 1998",
    runtime:"2h 49m",
    rating:"8.6",
    img:"savingpriv",
    price: 220
},
{
    title: "City of God 2002",
    runtime:"2h 10m",
    rating:"8.6",
    img:"cityofg",
    price: 200
},
{
    title: "The Green Mile 1999",
    runtime:"3h 9m",
    rating:"8.6",
    img:"greenmile",
    price: 200
},
{
    title: "Life is Beautiful 1997",
    runtime:"1h 56m",
    rating:"8.6",
    img:"life is beau",
    price: 180
},
{
    title: "Terminator 2 Judgment Day 1991",
    runtime:"2h 17m",
    rating:"8.6",
    img:"terminator2",
    price: 200
},
{
    title: "Star Wars Episode IV A New Hope 1977",
    runtime:"2h 1m",
    rating:"8.6",
    img:"swep5",
    price: 250
},
{
    title: "Back to the Future 1985",
    runtime:"1h 56m",
    rating:"8.5",
    img:"backtof",
    price: 200
}
]


let allhtml="";
allmovies.forEach((movie)=>{
    allhtml=allhtml+`
    
    <div class="moviedetails">
                <img  class="movimg" src="./resource/movies/${movie.img}.png">
            <div class="details">
            <div class="playbtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffd700" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>
            </div>
                <p>${movie.title}<p>
                    <p>${movie.runtime}</p>
                    <div class="ratings">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/><span> ${movie.rating}</span></svg>
                    </div>
                     <button class="bookbtn" data-movie="${movie.title}" data-price="${movie.price}">Book Now</button>
            </div>
        </div>
    
    `
})

document.querySelector('.container2').innerHTML=allhtml;

// Add event delegation for all 'Book Now' buttons
// Each button should have a data attribute for price and movie name

document.addEventListener('DOMContentLoaded', function() {
    // Book Now button click handler
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('bookbtn')) {
            const price = e.target.getAttribute('data-price');
            const movie = e.target.getAttribute('data-movie');
            // Store price and movie in localStorage
            localStorage.setItem('selectedMovie', movie);
            localStorage.setItem('ticketPrice', price);
            window.location.href = 'booking.html';
        }
    });

    const searchInput = document.querySelector('.searchbar');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, '');
        let found = false;
        // Split query into words for partial matching
        const queryWords = query.split(/[^a-z0-9]+/).filter(Boolean);
        // Search in both containers
        const allCards = document.querySelectorAll('.container .moviedetails, .container2 .moviedetails');
        allCards.forEach(card => {
            // Remove previous highlight
            card.style.outline = '';
            const titleElem = card.querySelector('.details p');
            if (titleElem) {
                // Normalize: lowercase and remove spaces
                const normalizedTitle = titleElem.textContent.toLowerCase().replace(/\s+/g, '');
                // Check if every query word is found in the title (partial match)
                const matches = queryWords.every(word => normalizedTitle.includes(word));
                if (matches && queryWords.length > 0) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.outline = '3px solid #ffd700';
                    found = true;
                }
            }
        });
        // Show 'No result' if not found and query is not empty
        let noResultElem = document.getElementById('no-result-msg');
        if (!found && query.length > 0) {
            if (!noResultElem) {
                noResultElem = document.createElement('div');
                noResultElem.id = 'no-result-msg';
                noResultElem.textContent = 'No result';
                noResultElem.style.color = 'red';
                noResultElem.style.textAlign = 'center';
                noResultElem.style.margin = '10px 0';
                searchInput.parentNode.insertBefore(noResultElem, searchInput.nextSibling);
            }
        } else if (noResultElem) {
            noResultElem.remove();
        }
    });
});
