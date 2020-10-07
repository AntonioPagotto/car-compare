import { ReadService } from './../../services/read.service';
import { Carro } from './../../models/carro.model';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "nav.component.html",
  styles: [],
})
export class NavComponent implements OnInit {

  carro: Carro[];
  displayedColumns = ['marca','modelo','anomodelo','valor']

  constructor(private readService: ReadService) {}


  ngOnInit(): void {
    this.readService.getCarro();
  }
}
