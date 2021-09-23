import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  movieDB: any[] = [];
  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title :string = "";
  year:number =0;
  movieId :string ="";
  aYear1:number = 0;
  aYear2: number = 0;
  selectedActor:string="";
  selectedTitle:string ="";


  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  
  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any)=>
    {
      this.movieDB = data;
    })
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item:any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item:any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId:number) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.selectedTitle ="";
    this.selectedActor ="";
  }

  // Save a new movie
  onSaveMovie()
  {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe((result:any) => {
      this.onGetActors();
      this.onGetMovies();
    });
  }

  onDeleteMovie(title:any) { 
    for(let i=0; i < this.movieDB.length;i++){
      if (this.movieDB[i].title == title){
        this.movieId = this.movieDB[i]._id;
      }
    };

    this.dbService.deleteMovie(this.movieId).subscribe((result:any) => {
      this.onGetActors();
      this.onGetMovies(); });
  }

  onDeleteMovieByYear(aYear1:number,aYear2:number)
  {
    for(let i=0; i < this.movieDB.length;i++){
      if (this.movieDB[i].year>=aYear1 && this.movieDB[i].year<=aYear2){
        this.movieId = this.movieDB[i]._id;
        this.dbService.deleteMovie(this.movieId).subscribe((result:any) => {
      this.onGetActors();
      this.onGetMovies(); });
      }
    };
  }

  onSelectActor(item:any)
  {
    this.selectedActor = item.name;
    this.actorId = item._id;
  }
  onSelectMovie(item:any)
  {
    this.movieId = item._id;
    this.selectedTitle =item.title;
  }

  onAddActor2Movie(){
    let obj ={
      id:this.actorId,
    }
    this.dbService.addActor(this.movieId,obj).subscribe((result:any) => {
          this.changeSection(1);
          this.onGetActors();
          this.onGetMovies(); 
        })
  }
  
}