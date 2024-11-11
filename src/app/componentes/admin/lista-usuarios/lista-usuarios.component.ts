import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements AfterViewInit{
  //Para crud
  @ViewChild('updateProductButton', { static: false }) updateProductButton!: ElementRef<HTMLButtonElement>;
  ngAfterViewInit() {
    this.updateProductButton.nativeElement.click();
  
}
}
