import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  petName: any;
  error = '';
  count = 0;
  buttonDisabled = false;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.petName = {name: "", type: "", description: "", skill1: "", skill2: "", skill3: "", likes: Number}
   }

  ngOnInit() {
      this._route.params.subscribe((params: Params)=>{
      this.getPet(params['id'])
    })
  };
  getPet(id){
    let observable = this._httpService.getPet(id)
    observable.subscribe(data=>{console.log(data)
      this.petName = data['data']
    })
  };
  getHome(){
    this._router.navigate(['/home'])
  }
  deletePet(id){
    let observable = this._httpService.deletePet(id)
    observable.subscribe(data =>{ console.log("Pet was Adopted")
    this.getHome();
    })
  };

  likePet(id,count){
    count++
    let observable = this._httpService.likePet(id,count)
    observable.subscribe(data=>{ 
    this.getPet(id)
    this.buttonDisabled = true;
    })
  };
 
}
