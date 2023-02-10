import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';


@Component({
  selector: 'app-registrar-empleados',
  templateUrl: './registrar-empleados.component.html',
  styleUrls: ['./registrar-empleados.component.css']
})
export class RegistrarEmpleadosComponent implements OnInit {

  empleado: Empleado = new Empleado();
  constructor(private EmpleadoServicio: EmpleadoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.empleado);
  }


  onSubmit() {
    this.guardarEmpleado();
  }
  
  irListaEmpleados() {
    this.router.navigate(['/empleados']);
  }
  guardarEmpleado() {
    this.EmpleadoServicio.registrarEmpleado(this.empleado).subscribe(dato => {
      console.log(dato);
      this.irListaEmpleados();

    }, error => console.log(error));
  }




}
