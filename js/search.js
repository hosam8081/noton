let input = document.querySelector("#input");
class GETAPI {
    async api() {

        let searchFetch = await fetch(`https://api.themoviedb.org/3/search/movie?query='${input.value}'&api_key=04c35731a5ee918f014970082a0088b1&page=1`)
        let searchData = await searchFetch.json();
        return { searchData };
    }
}

class UI {
    showMovies(data) {
        let res = data.results.map((ele) => {
            if (ele.backdrop_path !== null) {
                    return `
                <div class="item-movie">
                    <div class="item-img">
                        <span>${ele.vote_average}</span>
                        <img src="https://image.tmdb.org/t/p/w500/${ele.backdrop_path}" alt="${console.log(ele)}">
                        <div class="hidden">${ele.title}</div>
                    </div>
                </div>
                `;
            }
        });
        document.querySelector(".searching .grid").innerHTML = res.join("");
    }
}



input.addEventListener("keydown", function(e) {
    let getApi = new GETAPI;
    let ui = new UI;

    if (e.which == 13) {
        getApi.api().then(data => {
            ui.showMovies(data.searchData)
        })
    }
})