class Film{
    // Contructor de la clase film con los atributos de la clase que tendran cada objeto pelicula
    constructor(id,title,overview,popularity,poster_path,release_date,vote_average,vote_count,genre_ids){
        this.id=id;
        this.title=title;
        this.overview=overview;
        this.popularity=popularity;
        this.poster_path=poster_path;
        this.release_date=release_date;
        this.vote_average=vote_average;
        this.vote_count=vote_count;
        this.genre_ids=genre_ids;
    }
    // Creamos los seter

    set set_id(id){
        this.id=id;
    }
    set set_title(title){
        this.title=title;
    }
    set set_overview(overview){
        this.overview=overview;
    }
    set set_popularity(popularity){
        this.popularity=popularity;
    }
    set set_poster_path(poster_path){
        this.tiposter_pathtle=poster_path;
    }
    set set_release_date(release_date){
        this.release_date=release_date;
    }
    set set_vote_average(vote_average){
        this.vote_average=vote_average;
    }
    set set_vote_count(vote_count){
        this.vote_count=vote_count;
    }
    set set_genre_ids(genre_ids){
        this.genre_ids=genre_ids;
    }
    // Creamos los geter

    get get_id(){
        return this.id;
    }
    get get_title(){
        return this.title;
    }
    get get_overview(){
        return this.overview;
    }
    get get_popularity(){
        return this.popularity;
    }
    get get_poster_path(){
        return this.poster_path;
    }
    get get_release_date(){
        return this.release_date;
    }
    get get_vote_average(){
        return this.vote_average;
    }
    get get_vote_count(){
        return this.vote_count;
    }
    get get_genre_ids(){
        return this.genre_ids;
    }
}

class FilmList{
    // consturctor de la clase que sera un objeto lista para albergar objetos pelicula
    constructor(){
        this.list=[];
    }
    // seter y geter
    set set_list(list){
        this.list=list;
    }
    get get_list(){
        return this.list;
    }
    //Metodo para añadir objetos film a la lista
    addFilm(film){
        this.list.push(film);
    }
    //Metodo para eliminar objetos film de la lista
    removeFilm(filmId){
        // Crea un nuevo array con todos los objetos que no tengan el mismo id que que se tiene que quitar
        this.list=this.list.filter(obj => obj.get_id !== filmId);
    }
    //Metodo que muestra informacion
    showList(){
        this.list.forEach(obj=>{
            console.log(`Titulo: ${obj.get_title}.`);
            console.log(`Resumen: ${obj.get_overview}.`);
            console.log(`Año: ${obj.get_release_date}.`);
            console.log(`Popularidad: ${obj.get_popularity}.`);
            console.log(`Generos: ${obj.get_genre_ids}.`);
        });
    }

    // Añadir varias peliculas
    addMultipleFilms = (...films) => {
        //para cada elemento en ...films usamos el metodo addFilm
        films.forEach(obj => this.addFilm(obj));
    }

    // Ordena la lista por valor de popularidad
    sortFilmsByPopularity = () => {

        this.list.sort((a, b) => b.get_popularity - a.get_popularity);
    }

    // Devuelve nueva lista con filtro de fechas
    getFilmsByDateRange = (startDate, endDate) => {
        let d1 = new Date(startDate);
        let d2 = new Date(endDate);
        this.list=this.list.filter(obj => {
            let release = new Date(obj.get_release_date);
            return release >= d1 && release <= d2;
        });
    }

    // Devuelve true/false si esta un id de pelicula
    findFilmById(id,rep=0){
        if(this.list[rep].get_id===id){
            return true;
        }else if(rep<this.list.length-1){
            rep++;
            return this.findFilmById(id,rep);
        }else{
            return false;
        }
    }

    // Devuelve el genero mas repetido en la lista
    getMostCommonGenre() {
        //Uso de reduce
        //ListaGeneros crea un objeto con la cantidad de veces que aparece cada genero en la lista de peliculas
        let listaGeneros=this.list.reduce((acc,obj) =>{
            obj.get_genre_ids.forEach(id =>{
                if(acc[id]){
                    acc[id]++;
                }else{
                    acc[id]=1;
                }
            })
            return acc ;
        },{});
        // creamos variables de apoyo
        let genero;
        let masGenero=0;
        // iteramos el objeto listaGeneros para comparar el mas repetido
        for( let clave in listaGeneros){
            if(listaGeneros[clave]>masGenero){
                genero=clave;
                masGenero=listaGeneros[clave];
            }
        }
        return genero;

    }

    // Devuelve array de titulos populares
    static getPopularFilmTitles(votos,peliculas){
        let listaVotos=peliculas.filter(obj => obj.get_vote_average>votos);
        listaVotos=listaVotos.map(obj=>obj.get_title);
        return listaVotos;
    }
}



let pelicula1= new Film(1001,"Titanic","Esto es un resumen aburrido",87,"enlace","1997-12-19",35,50,[5,3,7,10]);
let pelicula2= new Film(1002,"Terminator","Esto es un resumen aburrido",99,"enlace","1984-10-26",60,50,[5,3,7,10]);
let pelicula3= new Film(1003,"Hora punta","Esto es un resumen aburrido",57,"enlace","1998-09-18",10,50,[7,10]);
let pelicula4= new Film(1004,"John Wick 4","Esto es un resumen aburrido",97,"enlace","2023-03-24",70,50,[10]);
let pelicula5= new Film(1005,"Toy Story 4","Esto es un resumen aburrido",55,"enlace","2019-06-11",80,50,[10]);

let miLista= new FilmList;

miLista.addFilm(pelicula1);
//miLista.showList();
miLista.addMultipleFilms(pelicula2,pelicula3,pelicula4,pelicula5);
//miLista.showList();
miLista.removeFilm(1005);
//miLista.showList();
miLista.sortFilmsByPopularity();
//miLista.showList();
miLista.getFilmsByDateRange("1998-06-10","2025-03-30");
//miLista.showList();
miLista.addMultipleFilms(pelicula1,pelicula2,pelicula5);
//miLista.showList();
//console.log(miLista.getMostCommonGenre());
//console.log(FilmList.getPopularFilmTitles(50,miLista.get_list));
//console.log(miLista.findFilmById(1004));