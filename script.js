let selector = document.getElementById("selector");

function onChange() {
  let option = selector.options[selector.selectedIndex].text;
  console.log(option);

  let div = document.getElementById("movie");
  div.remove();

  let information = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "0dcabfe51b80fa2de3e80d7d256e0e81",
      include_adult: "false",
      query: option,
    },
  });
  information = information.then((movieInfo) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieInfo.data.results.at(0).id}`,
        {
          params: {
            api_key: "0dcabfe51b80fa2de3e80d7d256e0e81",
            append_to_response: "videos",
          },
        }
      )
      .then((movieData) => {
        console.log(movieInfo.data.results.at(0));
        const poster = document.createElement("img");
        const backdrop = document.createElement("img");
        const title = document.createElement("h2");
        const originalTitle = document.createElement("h1");
        const description = document.createElement("p");
        const overview = document.createElement("p");
        const voteAverage = document.createElement("p");
        const movieTrailer = document.createElement("iframe");
        const container = document.createElement("div");
        const layer = document.createElement("div");
        layer.setAttribute("id", "layer");
        container.setAttribute("id", "movie");
        poster.setAttribute("id", "poster");
        backdrop.setAttribute("id", "background");
        description.setAttribute("id", "description");
        overview.setAttribute("id", "overview");
        voteAverage.setAttribute("id", "vote-average");
        const trailers = movieData.data.videos.results.filter(
          (trailer) => trailer.type === "Trailer"
        );
        movieTrailer.src = `https://www.youtube.com/embed/${trailers.at(0).key}`;
        poster.src = `https://image.tmdb.org/t/p/w500${movieInfo.data.results.at(0).poster_path}`;
        backdrop.src = `https://image.tmdb.org/t/p/w500${movieInfo.data.results.at(0).backdrop_path}`;
        title.innerHTML = `${movieInfo.data.results.at(0).title}`;
        originalTitle.innerHTML = `${movieInfo.data.results.at(0).original_title}`;
        description.innerHTML = `Release Date: ${movieInfo.data.results.at(0).release_date} </br></br> Original Language: ${movieInfo.data.results.at(0).original_language} </br></br> Popularity: ${movieInfo.data.results.at(0).popularity}`;
        overview.innerHTML = `${movieInfo.data.results.at(0).overview}`;
        voteAverage.innerHTML = `Vote Average : ${movieInfo.data.results.at(0).vote_average} </br> Vote Count : ${movieInfo.data.results.at(0).vote_count}`;

        container.appendChild(title);
        container.appendChild(originalTitle);
        container.appendChild(poster);
        container.appendChild(voteAverage);
        container.appendChild(backdrop);
        container.appendChild(description);
        container.appendChild(overview);
        container.appendChild(movieTrailer);
        container.appendChild(layer);
        document.body.append(container);
      });
  });
}
