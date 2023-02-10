import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  //empleados:Empleado[];

  empleados:Array<any> = [];

  constructor(private empleadoService:EmpleadoService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.obtenerEmpleado();
 
  }

  eliminarEmpleado(id:number){
    this.empleadoService.eliminarEmpleado(id).subscribe(dato=>{
      console.log(dato);
      this.obtenerEmpleado();
    })
  } 

  private obtenerEmpleado(){
      this.empleadoService.obtenerListEmpleados().subscribe(dato=>{
        this.empleados=dato;
      });  
  }
  
  verDetallesDelEmplado(id:number){
    this.router.navigate(['empleado-detalles',id]);;
  }
  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }


}
