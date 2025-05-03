package lomoToilet.api.carlosDiaz.Controllers;

import lomoToilet.api.carlosDiaz.Dtos.LoginDto;
import lomoToilet.api.carlosDiaz.Dtos.ProfesorDto;
import lomoToilet.api.carlosDiaz.Dtos.UpdatePasswordDto;
import lomoToilet.api.carlosDiaz.Dtos.UpdateProfesorContactDto;
import lomoToilet.api.carlosDiaz.Models.Profesor;
import lomoToilet.api.carlosDiaz.Services.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

  @Autowired
  private ProfesorService service;

  @GetMapping("/all")
  public Iterable<Profesor> getAllProfesores() {
    return service.getAllProfesores();
  }

  @PostMapping("/login")
  public ResponseEntity<ProfesorDto> loginProfesor(@RequestBody LoginDto loginDto) {
    Optional<ProfesorDto> profesor = service.loginProfesor(loginDto.getEmail(), loginDto.getContrasena());
    return profesor.map(p -> {
      ProfesorDto profesorDto = new ProfesorDto(
          p.getNombre(),
          p.getApellidos(),
          p.getEmail(),
          p.getTelefono(),
          p.getTipo()
      );
      return ResponseEntity.ok(profesorDto);
    }).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());

  }

  @PostMapping("/create")
  public ResponseEntity<String> createProfesor(@RequestBody Profesor profesor) {
    try {
      service.crearProfesor(profesor);
      return ResponseEntity.ok("Profesor creado correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear el profesor");
    }
  }

  @PutMapping("/update-login/{id}")
  public ResponseEntity<String> updateProfesor(@PathVariable UUID id, @RequestBody UpdateProfesorContactDto updateProfesorContactDto) {
    try {
      service.actualizarProfesor(id, updateProfesorContactDto.getEmail(), updateProfesorContactDto.getTelefono());
      return ResponseEntity.ok("E-mail y/o telefono actualizado correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @PutMapping("update-password/{id}")
  public ResponseEntity<String> actualizarContrasena(@PathVariable UUID id, @RequestBody UpdatePasswordDto passwordDto) {
    try {
      service.actualizarContrasena(id, passwordDto.getContrasena());
      return ResponseEntity.ok("Contraseña actualizada correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }
}
