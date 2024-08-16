
document.querySelector("button").addEventListener("click", findMovieApiReq);

async function findMovieApiReq() { {

    const movieTitle = document.querySelector("input").value;
    try {
        const response = await fetch(`https://sample-movie-api.onrender.com/api/${movieTitle}`);
        const data = await response.json();

        console.log(data)

        document.querySelector("#move-title").textContent = `Movie title: ${data[0].title}`;
        document.querySelector("#release-year").textContent = `Year: ${data[0].year}`;
        document.querySelector("#genre").textContent = `Genres: ${data[0].genres}`


    } catch (error) {
        console.error(error);
    }
}
    
}