import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  //Get all pets
  getPets(){
    return this._http.get('/pets');
  }
  //Add Pet
  addPet(newPets){
    return this._http.post('/pets', newPets);
  }
  //Get One Pet
  getPet(id){
    return this._http.get('/pets/'+id);
  }
  //Edit Pet
  editPet(pet){
    return this._http.put('/pets/'+pet._id, pet);
  }
  //Delete Pet
  deletePet(id){
    return this._http.delete('/pets/'+id);
  }
  //Like a Pet
  likePet(id,count){
    return this._http.put('/pets/likes/'+id, {count});
  }
}
