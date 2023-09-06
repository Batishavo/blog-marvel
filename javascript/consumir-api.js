import {comicToJson,toComic} from "./comic.js";

const getComics = (done)=>{
    const conexion_string = "https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&apikey=3b03881e336f538f010165c962d08abe&hash=45f10393a9682d517474ac2ad2c28622&ts=1000";
    const result = fetch(conexion_string);

    result.then((response)=>{
        return response.json();
    }).then((data)=>{
        done(data);
    });
}

getComics(data=>{
    
    //console.log(data);
    //console.log(data.data.results);
    //console.log(toComic(data));
    //console.log();
    
    let algo = comicToJson(data);
    let comics = toComic(algo);

    //console.log(comics);

    comics.data.results.forEach(comic => {
        //console.log(comic)   
        // console.log(comic.images[0].path);
        // console.log(comic.images[0].extension)
        //

        const article = document.createRange().createContextualFragment(
            /*html*/
            `
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="${comic.images[0].path}.${comic.images[0].extension}" alt="${comic.title}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${comic.title}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        )
        const main = document.querySelector("main");
        main.append(article);
        
    });

});