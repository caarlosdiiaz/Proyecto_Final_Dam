package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Models.Alumno;
import lomoToilet.api.carlosDiaz.Repositories.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AlumnoService {

  @Autowired
  private AlumnoRepository repository;

  public List<Alumno> getAllAlumnos() {
    return repository.findAll();
  }

  public Optional<Alumno> getAlumnoById(UUID id) {
    return repository.findById(id);
  }

  public Alumno createAlumno(Alumno alumno) {
    return repository.save(alumno);
  }

  public List<Alumno> getAlumnosByNivelAndGrupo(String nivel, Character grupo) {
    return repository.findAlumnosByNivelAndGrupo(nivel, grupo);
  }
}
