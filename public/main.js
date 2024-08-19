
document.querySelector("button").addEventListener("click", findMovieApiReq);

async function findMovieApiReq() { {

    const movieTitle = document.querySelector("input").value;
    try {
        const response = await fetch(`https://sample-movie-api.onrender.com/api/${movieTitle}`);
        const data = await response.json();

        console.log("DATA: ", data);

        //if the data array is empty
        if(!data.length) {
            document.querySelector("#move-title").textContent = "";
            document.querySelector("#release-year").textContent = "";
            document.querySelector("#genre").textContent = "";

            document.querySelector("#additional").textContent = `Didn't find any movies with this title.`;
            return;
        }

        //if the data array isnt empty
        document.querySelector("#move-title").textContent = `Movie title: ${data[0].title}`;
        document.querySelector("#release-year").textContent = `Year: ${data[0].year}`;
        document.querySelector("#genre").textContent = `Genres: ${data[0].genres}`

        //if there is more than one item in the data array
        if(data.length > 1) {
            if(data.length === 2) {
                document.querySelector("#additional").textContent = `Found one more movie.`
            } else {
                document.querySelector("#additional").textContent = `Found ${data.length - 1} more movies.`
            }
        }


    } catch (error) {
        console.error("Error: ", error);
    }
}
    
}