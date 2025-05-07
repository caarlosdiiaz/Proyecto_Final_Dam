package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Models.Alumno;
import lomoToilet.api.carlosDiaz.Repositories.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

  public List<Alumno> getAlumnosByCurso(Long id) {
    return repository.findAlumnosByCurso(id);
  }

  public boolean deleteAlumno(UUID id) {
    if (repository.existsById(id)) {
      repository.deleteById(id);
      return true;
    }
    return false;
  }

  @Transactional
  public void deleteAlumnosByCurso(Long id) {
    repository.deleteAlumnosByCurso(id);
  }
}
