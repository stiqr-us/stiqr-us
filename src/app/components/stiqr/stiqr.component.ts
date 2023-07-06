import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stiqr',
  templateUrl: './stiqr.component.html',
  styleUrls: ['./stiqr.component.scss']
})
export class StiqrComponent implements OnInit{

  id:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }
  testFunction() {
    console.log(this.id);
  }

}
