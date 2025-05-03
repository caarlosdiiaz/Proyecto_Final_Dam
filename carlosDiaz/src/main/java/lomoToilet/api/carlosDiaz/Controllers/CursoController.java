package lomoToilet.api.carlosDiaz.Controllers;

import lomoToilet.api.carlosDiaz.Models.Curso;
import lomoToilet.api.carlosDiaz.Services.CursoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {
  private final CursoService service;

  public CursoController(CursoService service) {
    this.service = service;
  }

  @GetMapping("/all")
  public Optional<List<Curso>> getAll() {
    return service.findAllCurso();
  }

  @GetMapping("/niveles-grupos")
  public Map<String, List<String>> getNivelesYGrupos() {
    List<Curso> cursos = service.findAllCurso()
        .orElseThrow(() -> new RuntimeException("No se encontraron cursos"));

    List<String> niveles = cursos.stream()
        .map(Curso::getNivel)
        .distinct()
        .collect(Collectors.toList());

    List<String> grupos = cursos.stream()
        .map(curso -> curso.getGrupo().toString())
        .distinct()
        .collect(Collectors.toList());

    return Map.of("niveles", niveles, "grupos", grupos);
  }

  @PostMapping("/crear")
  public Curso crearCurso(Curso curso) {
    return service.crearCurso(curso);
  }
}