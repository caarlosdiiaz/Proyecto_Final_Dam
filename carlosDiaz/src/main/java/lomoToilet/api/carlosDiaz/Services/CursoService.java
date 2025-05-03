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

  public Optional<List<Curso>> findAllCurso() {
    return Optional.of(repository.findAll());
  }
}
