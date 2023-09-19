/*Importacion de objetos */
import {Comic_Info} from "./Class/Comic-info.js";

let comic_info = [];

/*Funcion para renderizar la informacion del comic */
let render_comic = comic_info => {
  // console.log(comic_info);
  const article = document.createRange().createContextualFragment(
    `
    <div class="row card-comic pt-3 pb-3 ">
      <div class="col-lg-4 card-image">
          <h1>${comic_info.title}</h1>
          <img class="comic-image"
              src="${comic_info.cover}" alt="">
      </div>
      <div class="col-lg-6">
          <h2>Published:</h2>
          <p>${comic_info.date.slice(0, 10)}</p>
          <h2>Writer</h2>
          <p>${comic_info.writer}</p>
          <h2>Cover Artist:</h2>
          <p>${comic_info.cover_artist}</p>
          <hr>
          <p>
              ${comic_info.description}
          </p>
      </div>
  </div>
    `
  );
  const main = document.querySelector("main");
  main.append(article);
};

/*Obtener info */
const getComic = done => {
  const url = window.location;
  let params = new URL(url).searchParams;
  let id = params.get("id");
  //console.log(id);

  const conexion_string = `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=3b03881e336f538f010165c962d08abe&hash=45f10393a9682d517474ac2ad2c28622&ts=1000`;

  const result = fetch(conexion_string);
  // console.log(conexion_string)
  result
    .then(response => {
      return response.json();
    })
    .then(data => {
      //console.log(data)
      return done(data);
    })
    .then(info => {
      // console.log(info)
      render_comic(info);
    });
};

getComic(data => {
  //console.log(data.data.results);

  let comic = data.data.results[0];
  //console.log(comic);
  const actual_comic = new Comic_Info(
    comic.title,
    comic.images[0].path + "." + comic.images[0].extension,
    comic.dates[0].date,
    comic.creators.items[0].name,
    comic.creators.items[0].name,
    comic.description
  );
  //console.log(actual_comic)
  return actual_comic;
});
