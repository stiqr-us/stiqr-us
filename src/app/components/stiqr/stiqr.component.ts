import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stiqr',
  templateUrl: './stiqr.component.html',
  styleUrls: ['./stiqr.component.scss']
})
export class StiqrComponent implements OnInit{

  // This is the variable that contains the "id" parameter
  id:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }
  testFunction() {
    console.log(this.id);
  }

}
