package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Models.Curso;
import lomoToilet.api.carlosDiaz.Repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

  @Autowired
  private final CursoRepository repository;

  public CursoService(CursoRepository repository) {
    this.repository = repository;
  }

  public Curso crearCurso(Curso curso) {
    return repository.save(curso);
  }

  public List<Curso> findAllCurso() {
    return repository.findAll();
  }

  public void deleteCursoById(Long id) {
    if (!repository.existsById(id)) {
      throw new RuntimeException("Curso no encontrado");
    }
    repository.deleteById(id);
  }

  public void deleteAllCursos() {
    repository.deleteAll();
  }
}
