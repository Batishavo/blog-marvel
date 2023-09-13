import {comicToJson, toComic} from "./comic.js";

/*Obtener info de la api */

const getComics = done => {
  const conexion_string =
    "https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&apikey=3b03881e336f538f010165c962d08abe&hash=45f10393a9682d517474ac2ad2c28622&ts=1000";
  const result = fetch(conexion_string);

  result
    .then(response => {
      return response.json();
    })
    .then(data => {
      done(data);
    });
};

/*usar la api */
getComics(data => {
  data.data.results.forEach(comic => {
    //console.log(comic.id);

    const article = document.createRange().createContextualFragment(
      /*html*/
      `     
            <a href="/html/comic-info.html?id=${
              comic.id
            }" class="card col-xl-3 col-lg-5 col-md-7 col-sm-9 col-12 mb-5 m" >    
                <div class="" >
                    <div class="card-header">
                        <h3 class="title is-4">${comic.title}</h3>
                    </div>
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img class="img-fluid" src="${
                              comic.images[0].path
                            }.${comic.images[0].extension}"
                                alt="${comic.title}">
                        </figure>
                    </div>
                    <div class="card-body">
                        <div class="media">
                            <div class="media-content">
                                <h4>${comic.series.name}</h4>
                                <p>${comic.dates[0].date.slice(0, 10)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `
    );
    const main = document.querySelector("#comics");
    main.append(article);
  });
});
