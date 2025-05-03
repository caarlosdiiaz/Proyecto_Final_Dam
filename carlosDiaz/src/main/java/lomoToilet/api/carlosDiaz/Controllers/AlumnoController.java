package lomoToilet.api.carlosDiaz.Controllers;

import lomoToilet.api.carlosDiaz.Models.Alumno;
import lomoToilet.api.carlosDiaz.Services.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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

  @PostMapping("/create")
  public Alumno createAlumno(Alumno alumno) {
    return service.createAlumno(alumno);
  }
}
