package com.gestion.empleados.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.gestion.empleados.modelo.Empleado;
import com.gestion.empleados.repositorio.EmpleadoRepositorio;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpleadoControlador {
	
	@Autowired
	private EmpleadoRepositorio repositorio;

	
	@GetMapping("/empleados")
	public List<Empleado> listarTodosLosEmpleados() {
		return repositorio.findAll();
	}
	//metodo para guardar empleado
	@PostMapping("/empleados")
	public Empleado guardarEmpleado(@RequestBody Empleado empleado) {
		return repositorio.save(empleado);
		
	}	
	@GetMapping("/empleados/{id}")
	public ResponseEntity<Empleado>obtenerEmpleadoPorIEntity(@PathVariable Long id){
		Empleado empleado=repositorio.findById(id).orElseThrow(()->new ResourceAccessException("No se ha encontrado el usuario en la bd con el id :"+id));
		return ResponseEntity.ok(empleado);
	}
	
	@PutMapping("/empleados/{id}")
	public ResponseEntity<Empleado>actualizarEmpleado(@PathVariable Long id,@RequestBody Empleado detallEmpleado){
		Empleado empleado=repositorio.findById(id).orElseThrow(()->new ResourceAccessException("No se ha encontrado el usuario en la bd con el id :"+id));

		empleado.setName(detallEmpleado.getName());
		empleado.setLastname(detallEmpleado.getLastname());
		empleado.setDni(detallEmpleado.getDni());
		
		Empleado empleadoActualizado=repositorio.save(empleado);

		return ResponseEntity.ok(empleadoActualizado);

	}
	
	@DeleteMapping("/empleados/{id}")
	public ResponseEntity<Map<String,Boolean>> eliminarEmpleado(@PathVariable Long id){
		Empleado empleado = repositorio.findById(id)
				            .orElseThrow(()->new ResourceAccessException("No se ha encontrado el usuario en la bd con el id :"+id));
		
		repositorio.delete(empleado);
		Map<String, Boolean> respuesta = new HashMap<>();
		respuesta.put("eliminar",Boolean.TRUE);
		return ResponseEntity.ok(respuesta);
    }
	
	
}
