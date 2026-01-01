# Movies
🎬 CinemaMatch – Movie Recommendation System

CinemaMatch is a machine learning–powered movie recommendation web app that suggests similar movies based on content similarity.
It combines an ML backend with a modern custom UI to provide an intuitive movie discovery experience.

🚀 Features

Search movies by title
Content-based movie recommendations
Custom UI built with HTML, CSS, and JavaScript
Fast similarity matching using ML techniques
Web deployment using Streamlit

🧠 Model Overview

CinemaMatch uses a content-based recommendation system.

Dataset

The model works on a movie dataset containing:
Genres
Keywords
Tagline
Cast
Director

These features describe the movie’s theme and style.

Feature Engineering

Relevant features are combined into a single text representation:
genres + keywords + tagline + cast + director

🗂️ Project Structure
movie_gdg/
│
├── app.py # ML logic and Streamlit backend
├── movies.csv # Dataset
├── index.html # Frontend structure
├── style.css # Styling
├── script.js # Frontend logic
└── README.md

pip install streamlit pandas scikit-learn
streamlit run app.py

✨ Conclusion

CinemaMatch demonstrates how machine learning models can be effectively integrated with modern web interfaces to build intelligent recommendation systems.
It serves as a strong example of ML + web development integration suitable for academic, portfolio, and demo projects.
