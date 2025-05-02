package lomoToilet.api.carlosDiaz.Controllers;

import lomoToilet.api.carlosDiaz.Dtos.LoginDto;
import lomoToilet.api.carlosDiaz.Dtos.ProfesorDto;
import lomoToilet.api.carlosDiaz.Models.Profesor;
import lomoToilet.api.carlosDiaz.Services.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
    Optional<Profesor> profesor = service.loginProfesor(loginDto.getEmail(), loginDto.getContrasena());
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
  public void createProfesor(@RequestBody Profesor profesor) {
    service.crearProfesor(profesor);
  }
}
