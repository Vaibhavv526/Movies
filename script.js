// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Movie Data (This would come from your backend API)
    const sampleMovies = [
        {
            id: 1,
            title: "Inception",
            year: 2010,
            rating: 8.8,
            duration: "2h 28m",
            genres: ["Action", "Sci-Fi", "Thriller"],
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
            director: "Christopher Nolan",
            color1: "#4ecdc4",
            color2: "#44a08d"
        },
        {
            id: 2,
            title: "The Dark Knight",
            year: 2008,
            rating: 9.0,
            duration: "2h 32m",
            genres: ["Action", "Crime", "Drama"],
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
            director: "Christopher Nolan",
            color1: "#ff6b6b",
            color2: "#ff8e53"
        },
        {
            id: 3,
            title: "Parasite",
            year: 2019,
            rating: 8.6,
            duration: "2h 12m",
            genres: ["Comedy", "Drama", "Thriller"],
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
            director: "Bong Joon Ho",
            color1: "#9d50bb",
            color2: "#6e48aa"
        }
    ];

    // Search Functionality
    const movieInput = document.getElementById('movieInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Quick tags
    document.querySelectorAll('.quick-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            movieInput.value = tag.dataset.movie;
            getRecommendations();
        });
    });

    // Search with Enter key
    movieInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getRecommendations();
        }
    });

    // Search button click
    searchBtn.addEventListener('click', getRecommendations);

    // Mock API call to get recommendations
    async function getRecommendations() {
        const movieName = movieInput.value.trim();
        
        if (!movieName) {
            alert('Please enter a movie name');
            return;
        }

        // Show loading state
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        const loadingState = document.getElementById('loadingState');
        const selectedMovieCard = document.getElementById('selectedMovieCard');
        
        recommendationsGrid.style.display = 'none';
        loadingState.style.display = 'block';

        // Simulate API delay
        setTimeout(() => {
            // Update selected movie
            document.getElementById('selectedMovieTitle').textContent = movieName;
            document.getElementById('selectedMovieGenres').innerHTML = 
                '<span class="genre-badge">Action</span><span class="genre-badge">Sci-Fi</span>';
            document.getElementById('selectedMovieDesc').textContent = 
                'A mind-bending thriller about dream infiltration';
            
            selectedMovieCard.style.display = 'block';

            // Generate mock recommendations
            generateMockRecommendations();
            
            // Hide loading, show results
            loadingState.style.display = 'none';
            recommendationsGrid.style.display = 'grid';
            
            // Scroll to recommendations
            document.getElementById('recommendations').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 1500);
    }

    function generateMockRecommendations() {
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        recommendationsGrid.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const movie = sampleMovies[i % 3];
            const similarityScore = (90 - i * 5) / 100;
            
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <div class="card-header">
                    <div class="card-image" style="background: linear-gradient(45deg, ${movie.color1}, ${movie.color2})"></div>
                    <div class="card-overlay">
                        <h3 class="card-title">${movie.title} (${movie.year})</h3>
                        <div class="card-meta">
                            <span>${movie.duration}</span>
                            <span>Similarity: ${(similarityScore * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                    <div class="card-rating-badge">
                        <i class="fas fa-star"></i> ${movie.rating}
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-tags">
                        ${movie.genres.map(genre => `<span class="card-tag">${genre}</span>`).join('')}
                    </div>
                    <p class="card-description">${movie.description.substring(0, 100)}...</p>
                </div>
            `;
            
            movieCard.addEventListener('click', () => showMovieDetails(movie));
            recommendationsGrid.appendChild(movieCard);
        }
    }

    // Explore Section - Generate movie cards
    function generateExploreCards() {
        const exploreGrid = document.getElementById('exploreGrid');
        
        for (let i = 0; i < 12; i++) {
            const movie = sampleMovies[i % 3];
            
            const card = document.createElement('div');
            card.className = 'explore-card';
            card.innerHTML = `
                <div class="explore-poster" style="background: linear-gradient(45deg, ${movie.color1}, ${movie.color2})"></div>
                <div class="explore-title">${movie.title} (${movie.year})</div>
            `;
            
            card.addEventListener('click', () => {
                movieInput.value = movie.title;
                getRecommendations();
            });
            
            exploreGrid.appendChild(card);
        }
    }

    // Genre Filters
    document.querySelectorAll('.genre-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.genre-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Here you would filter movies by genre
        });
    });

    // Modal functionality
    const modal = document.getElementById('movieModal');
    const closeModal = document.getElementById('closeModal');
    
    function showMovieDetails(movie) {
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalRating').textContent = movie.rating;
        document.getElementById('modalYear').textContent = movie.year;
        document.getElementById('modalDuration').textContent = movie.duration;
        document.getElementById('modalDescription').textContent = movie.description;
        document.getElementById('modalCast').textContent = movie.cast;
        document.getElementById('modalDirector').textContent = movie.director;
        
        const modalGenres = document.getElementById('modalGenres');
        modalGenres.innerHTML = movie.genres.map(genre => 
            `<span class="genre-badge">${genre}</span>`
        ).join('');
        
        const modalPoster = document.querySelector('.modal-poster');
        modalPoster.style.background = `linear-gradient(45deg, ${movie.color1}, ${movie.color2})`;
        
        modal.style.display = 'flex';
    }
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize explore section
    generateExploreCards();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});