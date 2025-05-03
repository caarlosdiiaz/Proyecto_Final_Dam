package lomoToilet.api.carlosDiaz.Controllers;

import lomoToilet.api.carlosDiaz.Models.Alumno;
import lomoToilet.api.carlosDiaz.Services.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

  @Autowired
  private AlumnoService service;

  @GetMapping("/all")
  public List<Alumno> getAllAlumnos() {
    return service.getAllAlumnos();
  }

  @GetMapping("/{id}")
  public Optional<Alumno> getAlumnoById(@RequestParam UUID id) {
    return service.getAlumnoById(id);
  }

  @PostMapping("/create")
  public Alumno createAlumno(@RequestBody Alumno alumno) {
    return service.createAlumno(alumno);
  }
}
