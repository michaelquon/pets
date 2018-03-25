import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  petName: any;
  error = ''
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.petName = {name: "", type: "", description: "", skill1: "", skill2: "", skill3: ""}
   }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getPet(params['id'])
    });
  }
  getPet(id){
    let observable = this._httpService.getPet(id)
    observable.subscribe(data=>{
      this.petName = data['data']
    })
  };
  addPet(id){
    if(this.petName.name.length <=3){
      this.error = "Name must be 3 characters long"
    }
    else{
      let observable = this._httpService.editPet(this.petName)
      observable.subscribe(data=>{
      this.petName = {name: "", type: "", description: "", skill1: "", skill2: "", skill3: ""}
      this.getInfo(id)
      })
    }
  }
  getInfo(id){
    this._router.navigate(['/info/'+id])
  };
}
