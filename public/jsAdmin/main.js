window.onload = function () {
    const API_KEY = "api_key=582118d727a442d47c146c982576a944";
    const BASE_URL = "https://api.themoviedb.org/3";
    const HOME_URL =
      BASE_URL +
      "/discover/movie?language=vi-VI&sort_by=popularity.desc&" +
      API_KEY;
    const IMG_URL = "https://image.tmdb.org/t/p/w500/";
    const SEARCH_URL = BASE_URL + "/search/movie?language=vi-VI&" + API_KEY;
    const GENRE_URL = BASE_URL + "/genre/movie/list?language=vi-VI&" + API_KEY;
  
    const main = document.getElementById("main");
    const form = document.getElementById("form");
    const searchBox = document.getElementById("search");
  
    const prevTag = document.getElementById("pagi__prev");
    const currentTag = document.getElementById("pagi__current");
    const nextTag = document.getElementById("pagi__next");
  
    let currentPage = 1;
    let nextPage = 2;
    let prevPage = 3;
    let lastUrl = "";
    let totalPages = 100;
  
    const genres = [
      {
        id: 28,
        name: "Phim Hành Động",
      },
      {
        id: 12,
        name: "Phim Phiêu Lưu",
      },
      {
        id: 16,
        name: "Phim Hoạt Hình",
      },
      {
        id: 35,
        name: "Phim Hài",
      },
      {
        id: 80,
        name: "Phim Hình Sự",
      },
      {
        id: 99,
        name: "Phim Tài Liệu",
      },
      {
        id: 18,
        name: "Phim Chính Kịch",
      },
      {
        id: 10751,
        name: "Phim Gia Đình",
      },
      {
        id: 14,
        name: "Phim Giả Tượng",
      },
      {
        id: 36,
        name: "Phim Lịch Sử",
      },
      {
        id: 27,
        name: "Phim Kinh Dị",
      },
      {
        id: 10402,
        name: "Phim Nhạc",
      },
      {
        id: 9648,
        name: "Phim Bí Ẩn",
      },
      {
        id: 10749,
        name: "Phim Lãng Mạn",
      },
      {
        id: 878,
        name: "Phim Khoa Học Viễn Tưởng",
      },
      {
        id: 10770,
        name: "Chương Trình Truyền Hình",
      },
      {
        id: 53,
        name: "Phim Gây Cấn",
      },
      {
        id: 10752,
        name: "Phim Chiến Tranh",
      },
      {
        id: 37,
        name: "Phim Miền Tây",
      },
    ];
    const tagEl = document.getElementById("tags");
    var selectedGenre = [];
    setGenre();
    function setGenre() {
      tagEl.innerHTML = "";
      genres.forEach((genre) => {
        const t = document.createElement("div");
        t.classList.add("tag");
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener("click", () => {
          createClearBtn();
          if (selectedGenre.length == 0) {
            selectedGenre.push(genre.id);
          } else {
            if (selectedGenre.includes(genre.id)) {
              selectedGenre.forEach((id, idx) => {
                if (id == genre.id) {
                  selectedGenre.splice(idx, 1);
                }
              });
            } else {
              selectedGenre.push(genre.id);
            }
          }
          // console.log(selectedGenre);
          getMovies(
            HOME_URL + "&with_genres=" + encodeURI(selectedGenre.join(","))
          );
        });
        tagEl.append(t);
      });
      // highlightSelection();
    }
  
    // Tag / Genre click event
  
    // Old code
    // function highlightSelection() {
    //   if (selectedGenre.length != 0) {
    //     selectedGenre.forEach((id) => {
    //       const highlightSelection = document.getElementById(id);
    //       highlightSelection.classList.add("highlight");
    //     });
    //   }
    // }
  
    document.querySelector(".tags").addEventListener("click", (e) => {
      const genreBtn = e.target.closest(".tag");
      genreBtn.classList.toggle("highlight");
    });
    //
  
    function createClearBtn() {
      let clearBtn = document.getElementById("clear");
      if (clearBtn) {
        clearBtn.classList.add("highlight");
      } else {
        let clear = document.createElement("div");
        clear.classList.add("tag", "highlight");
        clear.id = "clear";
        clear.innerText = "Clear X";
        clear.addEventListener("click", () => {
          selectedGenre = [];
          setGenre();
          getMovies(HOME_URL);
        });
        tagEl.append(clear);
      }
    }
    getMovies(HOME_URL);
  
    function getMovies(HOME_URL) {
      lastUrl = HOME_URL;
  
      fetch(HOME_URL).then((response) => {
        if (response.status !== 200) {
          console.log("Error, error code: " + response.status);
          return;
        }
  
        response.json().then((data) => {
          console.log(data.results);
          if (data.results.length !== 0) {
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;
  
            currentTag.innerHTML = currentPage;
            currentTag.classList.add("pagi__current");
  
            if (currentPage <= 1) {
              prevTag.classList.add("pagi__disabled");
              nextTag.classList.remove("pagi__disabled");
            } else if (currentPage >= totalPages) {
              nextTag.classList.add("pagi__disabled");
              prevTag.classList.remove("pagi__disabled");
            } else {
              nextTag.classList.remove("pagi__disabled");
              prevTag.classList.remove("pagi__disabled");
            }
            tagEl.scrollIntoView({ behavior: "smooth" });
            showMovies(data.results);
          } else {
            main.innerHTML =
              "<h1 class='text-light p-5'>Không tìm thấy kết quả<h1>";
          }
        });
      });
    }
  
    function showMovies(movies) {
      main.innerHTML = "";
      movies.forEach((movie) => {
        if (movie.id !== 335787) {
          let film = document.createElement("div");
          film.classList.add("movie-card");
          let cardfront = document.createElement("div");
          cardfront.classList.add("card-front");
          let cardback = document.createElement("div");
          cardback.classList.add("card-back");
          fetch(
            BASE_URL + "/movie/" + movie.id + "?" + API_KEY + "&language=en-US"
          ).then((response) => {
            if (response.status !== 200) {
              console.log("Error, error code: " + response.status);
              return;
            }
            response.json().then((data) => {
              a = data.runtime;
              cardfront.innerHTML = `
          <img
            class="thumbnail"
            src="${
              movie.poster_path
                ? IMG_URL + movie.poster_path
                : "https://via.placeholder.com/300x450"
            }" alt="${movie.original_title}"
          />`;
              cardback.innerHTML = `<img
            class="thumbnail"
            src="${
              movie.poster_path
                ? IMG_URL + movie.poster_path
                : "https://via.placeholder.com/300x450"
            }" alt="${movie.original_title}"
          />
          <div class="card-content">
            <h5 class="movie-title">${movie.original_title}</h5>
            <p class="movie-length">${data.runtime}p</p>
            <p class="movie-length"><span class="rate ${getColorRate(
              movie.vote_average
            )}">Rating: ${movie.vote_average}</span></p>
            <div class="movie-buttons">
              <a href="#"
                ><ion-icon name="play-circle-outline"></ion-icon
              ></a>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
          </div>`;
            });
          });
          film.appendChild(cardfront);
          film.appendChild(cardback);
          main.appendChild(film);
        }
      });
    }
  
    function getOverview(overview) {
      if (overview) {
        return overview;
      } else {
        return "Bộ phim này không có overview. Chúng tôi sẽ cố gắng cập nhật nó sớm nhất có thể. Xin lỗi vì sự bất tiện này.";
      }
    }
  
    function getColorRate(rate) {
      if (rate >= 8.0) {
        return "rate--green";
      } else if (rate > 6.0) {
        return "rate--orange";
      } else {
        return "rate--red";
      }
    }
  
    function clearAllGenres() {
      selectedGenre = [];
      getMovies(HOME_URL);
      getGenres(GENRE_URL);
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const searchText = searchBox.value;
      selectedGenre = [];
      setGenre();
      if (searchText) {
        getMovies(SEARCH_URL + "&query=" + searchText);
      } else {
        getMovies(HOME_URL);
      }
    });
  
    nextTag.addEventListener("click", () => {
      if (nextPage <= totalPages) {
        pageLoad(nextPage);
      }
      tagEl.scrollIntoView({ behavior: "smooth" });
    });
  
    prevTag.addEventListener("click", () => {
      if (prevPage > 0) {
        pageLoad(prevPage);
      }
      tagEl.scrollIntoView({ behavior: "smooth" });
    });
  
    function pageLoad(page) {
      let urlSplit = lastUrl.split("?");
      let queryParams = urlSplit[1].split("&");
      let queryPage = queryParams[queryParams.length - 1].split("=");
  
      if (queryPage[0] !== "page") {
        let urlPageLoad = lastUrl + "&page=" + page;
  
        getMovies(urlPageLoad);
      } else {
        queryPage[1] = page.toString();
  
        let joinQueryPage = queryPage.join("=");
        queryParams[queryParams.length - 1] = joinQueryPage;
  
        let joinQueryParams = queryParams.join("&");
        urlSplit[1] = joinQueryParams;
  
        let joinUrlSplit = urlSplit.join("?");
        getMovies(joinUrlSplit);
      }
    }
  };
  