import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  error = '';
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newPet = {name: "", type: "", description: "", skill1: "", skill2: "", skill3: ""}
  }

  addPet(){
    let observable = this._httpService.addPet(this.newPet);
    observable.subscribe(data => { console.log(this.error)
      if(data['error']){
        this.error = "This name is already taken, please use another name"
        
      }
      else{
        console.log("A Pet was added", data)
        this.newPet = {name: "", type: "", description: "", skill1: "", skill2: "", skill3: ""}
        this.getHome()
      }
    })
  };
  getHome(){
    this._router.navigate(['/home'])
  }
}
