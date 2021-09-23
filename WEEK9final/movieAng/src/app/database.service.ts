import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}
  result: any;

  getActors() {
    return this.http.get("/actors");
  }

  getMovies(){
    return this.http.get("/movies");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data:any) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id:any, data:any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id:any) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteMovie(id:any)
  {
    let url = "/movies/" +id;
    return this.http.delete(url,httpOptions);
  }

  createMovie(data:any)
  {
    return this.http.post("/movies",data,httpOptions);
  }


  deleteMovieByYear()
  {
    
    return this.http.post("/movies/delete",httpOptions);
  }

  //app.post('/movies/:id/actor',movies.addActor);
  addActor(movieId:any,data:any)
  {
    let url = `/movies/${movieId}/actor`;
    return this.http.post(url,data,httpOptions);
  }


}
