class Comic_Info{
    constructor(
        title
        ,cover
        ,date
        ,writer
        ,cover_artist 
        ,description  = "The api didn't provide any descrition"
        
    ){
        this.title = title;
        this.cover = cover;
        this.date  = date;
        this.writer = writer;
        this.cover_artist = cover_artist;
        this.description = description;
        if(this.description===null){
            this.description = "The api didn't provide any descrition";
        }
    }
};

export {Comic_Info};

