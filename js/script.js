

class GETAPI {
    async api() {
        let response = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1"
        );
        let data = await response.json();
        let tvFetch = await fetch(
            "https://api.themoviedb.org/3/trending/tv/day?api_key=04c35731a5ee918f014970082a0088b1"
        );
        let tvData = await tvFetch.json();
        let searchFetch = await fetch(`https://api.themoviedb.org/3/search/movie?query='${input.value}'&api_key=04c35731a5ee918f014970082a0088b1&page=1`)
        let searchData = await searchFetch.json();
        return { data, tvData, searchData };
    }
}

class UI {
    // show popular movies in html
    showPopular(data) {
        let res = data.results.map((ele) => {
            return `
            <div class="item-movie col col-lg-5 col-sm-6 col-md-4 movies-id">
                 <div class="item-img">
                     <span>${ele.vote_average}</span>
                     <img src="https://image.tmdb.org/t/p/w1280/${ele.backdrop_path}" alt="${ele.title}">
                     <div class="hidden">${ele.title}</div>
                 </div>
             </div>
            `;
        });
        document.querySelector(".movies .row").innerHTML = res.join("");
    }

    showMovies(data) {
        let res = data.results.map((ele) => {
            return `
            <div class="item-movie">
                <div class="item-img">
                    <span>${ele.vote_average}</span>
                    <img src="" alt="${console.log(ele)}">
                    <div class="hidden">${ele.title}</div>
                </div>
            </div>
            `;
        });
        document.querySelector(".searching .grid").innerHTML = res.join("");
    }

    // show popular serise in html
    showSerise(tvData) {
        let res = tvData.results.map((ele) => {
            return `
            <div class="item-movie col col-lg-5 col-sm-6 col-md-4 series-id">
                 <div class="item-img">
                     <span>${ele.vote_average}</span>
                     <img id="img" data-id="${ele.id}" src="https://image.tmdb.org/t/p/w500/${ele.backdrop_path}" alt="">
                     <div class="hidden">${ele.name}</div>
                 </div>
             </div>
            `;
        });
        document.querySelector("#series .row").innerHTML = res.join("");

        // on clicking image show pop up
        document.querySelectorAll("#img").forEach((ele) => {
            ele.addEventListener("click", function (e) {
                let idData = tvData.results.filter(
                    (ele) => ele.id == e.target.dataset.id
                );
                let show = idData.map((ele) => {
                    return `
                   <div>
                   <span class="close">X</span>
                    <h1>${ele.name}</h1>
                    <div class="pop-row">
                        <img src="https://image.tmdb.org/t/p/w500/${ele.backdrop_path}" alt="">
                        <div>
                            <p>${ele.name}</p>
                            <p>orignal name: <span>${ele.original_name}</span></p>
                            <p>data: <span>${ele.first_air_date}</span></p>
                            <p>vote:${ele.vote_average}</p>
                        </div>
                    </div>
                    <p>${ele.overview}</p>
                </div>
                `;
                });
                document.querySelector(".popup-container").innerHTML = show;

                // show popup
                document.querySelector(".popup").classList.add("show");
                document.querySelector(".popup-container").classList.add("show");
                // close  pop up
                document.querySelector(".close").addEventListener("click", function () {
                    document.querySelector(".popup").classList.remove("show");
                    document .querySelector(".popup-container").classList.remove("show");
                });
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let getApi = new GETAPI();
    let ui = new UI();

    getApi.api().then((data) => {
        ui.showPopular(data.data);
        ui.showSerise(data.tvData);

            // if keydown equal to 13
    document.querySelector(".search-container input").addEventListener("keydown", (e) => {
        if (e.which == 13) {
            ui.showMovies(data.searchData)
            // open html 
           
        }
    })
    });
});

/* 
=============
    search 
=============
*/


/* 
================
    carsoul
================
*/
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let right = document.querySelector(".right");
let left = document.querySelector(".left");
let curr = 0;

document.addEventListener("DOMContentLoaded", (e)=> {
    // btn next
    next.addEventListener("click", function (e) {
        nextSeries(e, curr++);
    });
    // btn prev
    prev.addEventListener("click", function (e) {
        prevSeries(e, curr--);
    });
    // btn next
    left.addEventListener("click", function (e) {
        nextSeries(e, curr++);
    });
    // btn left
    right.addEventListener("click", function (e) {
        prevSeries(e, curr--);
    });
})

// NEXT
function nextSeries(e, incress) {
    // incress current
    incress;
    // check if current smaller than 20
    if (curr >= document.querySelectorAll(`${e.target.dataset.next}`).length) {
        curr = 0;
    }
    // translate div
    document.querySelectorAll(`${e.target.dataset.next}`).forEach((ele) => {
        let width = document.querySelector(`.series-id`).clientWidth;
        ele.style.transform = `translate(${curr * -width}px)`;
    });
}

// prev
function prevSeries(e, incress) {
    // decress current
    incress;
    // check if current bigger than 0
    if (curr < 0) {
        curr = document.querySelectorAll(`${e.target.dataset.next}`).length - 1;
    }
    // get width of div
    let width = document.querySelector(`.series-id`).clientWidth;
    // translate div
    document.querySelectorAll(`${e.target.dataset.next}`).forEach((ele) => {
        ele.style.transform = `translate(${curr * -width}px)`;
    });
}
