/*Obtener info */

const getComic = done => {
  const url = window.location;
  let params = new URL(url).searchParams;

  console.log(params.get("id"));

  const conexion_string =
    "https://gateway.marvel.com:443/v1/public/comics/108443?apikey=3b03881e336f538f010165c962d08abe&hash=45f10393a9682d517474ac2ad2c28622&ts=1000";

  const result = fetch(conexion_string);

  result
    .then(response => {
      return response.json();
    })
    .then(data => {
      done(data);
    });
};

getComic(data => {
  console.log(data);
});
