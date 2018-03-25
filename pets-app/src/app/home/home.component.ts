import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getPets();
  }

  getPets(){
    let observable = this._httpService.getPets();
    observable.subscribe(data => {console.log("Got all pets", data)
    this.pets = data['data']
  })
  };
  getNew(){
    this._router.navigate(['/new'])
  };
  getInfo(id){
    this._router.navigate(['/info/'+id])
  };
  getEdit(id){
    this._router.navigate(['/edit/'+id])
  }
}
