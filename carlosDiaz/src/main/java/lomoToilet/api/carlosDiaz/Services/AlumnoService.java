package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Models.Alumno;
import lomoToilet.api.carlosDiaz.Repositories.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService {

  @Autowired
  private AlumnoRepository repository;

  public List<Alumno> getAllAlumnos() {
    return repository.findAll();
  }

  public Alumno createAlumno(Alumno alumno) {
    return repository.save(alumno);
  }
}
