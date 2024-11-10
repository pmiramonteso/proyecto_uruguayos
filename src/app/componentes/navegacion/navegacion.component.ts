import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('NavegacionComponent cargado');
  }
}
