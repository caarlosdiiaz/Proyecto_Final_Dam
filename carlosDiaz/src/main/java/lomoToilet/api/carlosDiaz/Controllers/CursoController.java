package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Models.Curso;
import lomoToilet.api.carlosDiaz.Services.CursoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {
  private final CursoService service;

  public CursoController(CursoService service) {
    this.service = service;
  }

  @Operation(summary = "Crear un nuevo profesor", description = "Registra un nuevo profesor en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Profesor creado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al crear el profesor"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @GetMapping("/all")
  public List<Curso> getAll() {
    return service.findAllCurso();
  }

  @Operation(summary = "Obtener niveles y grupos", description = "Devuelve una lista de niveles y grupos únicos de los cursos.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Niveles y grupos obtenidos correctamente"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @GetMapping("/levels-groups")
  public Map<String, List<String>> getNivelesYGrupos() {
    List<Curso> cursos = service.findAllCurso();

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

  @Operation(summary = "Crear un nuevo curso", description = "Registra un nuevo curso en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Curso creado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al crear el curso"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/create")
  public Curso crearCurso(@RequestBody  Curso curso) {
    return service.crearCurso(curso);
  }

  @Operation(summary = "Eliminar un curso por ID", description = "Elimina un curso específico por su ID.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Curso eliminado correctamente"),
      @ApiResponse(responseCode = "404", description = "Curso no encontrado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteCursoById(@PathVariable Long id) {
    try {
      service.deleteCursoById(id);
      return ResponseEntity.ok("Curso eliminado correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @Operation(summary = "Eliminar todos los cursos", description = "Elimina todos los cursos registrados en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Todos los cursos eliminados correctamente"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @DeleteMapping("/delete-all")
  public ResponseEntity<String> deleteAllCursos() {
    try {
      service.deleteAllCursos();
      return ResponseEntity.ok("Todos los cursos eliminados correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar los cursos");
    }
  }
}