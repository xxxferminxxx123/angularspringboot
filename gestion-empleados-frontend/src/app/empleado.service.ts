import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  //(URL OBTIENE LISTADO DE TODOS LOS EMPLEADOS DEL BACKEND)
  private baseURL="http://localhost:8080/api/v1/empleados";

  constructor(private httClient: HttpClient) { }

  //metodo para obtener los empleados
  obtenerListEmpleados():Observable<Empleado[]>{
      return this.httClient.get<Empleado[]>(`${this.baseURL}`);
  }

  actualizarEmpleado(id:number,empleado:Empleado):Observable<Object>{
    return this.httClient.put(`${this.baseURL}/${id}`,empleado);
  }

  //metodo para eliminar los empleados
  eliminarEmpleado(id:number):Observable<Object>{
    return this.httClient.delete(`${this.baseURL}/${id}`);
  }

  //metodo para registrar empleado
  registrarEmpleado(empleado:Empleado): Observable<Object>{
    return this.httClient.post(`${this.baseURL}`,empleado);
  }
  
  obtenerEmpleadoPorId(id:number):Observable<Empleado>{
    return this.httClient.get<Empleado>(`${this.baseURL}/${id}`);
  }

}
