export class Item{
    public name: string;
    public description: string;
    public imagePath: string;
    public songPath: string

    constructor(name: string , desc: string , imagePath: string, songPath:string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.songPath = songPath;
    }
}