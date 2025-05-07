package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

  @Operation(summary = "Crear un nuevo alumno", description = "Registra un nuevo alumno en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumno creado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al crear el alumno"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @GetMapping("/all")
  public List<Alumno> getAllAlumnos() {
    return service.getAllAlumnos();
  }

  @Operation(summary = "Obtener un alumno por ID", description = "Devuelve un alumno por su ID.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumno encontrado"),
      @ApiResponse(responseCode = "404", description = "Alumno no encontrado")
  })
  @GetMapping("/{id}")
  public Optional<Alumno> getAlumnoById(@RequestParam UUID id) {
    return service.getAlumnoById(id);
  }

  @Operation(summary = "Obtener Todos los alumnos de un curso", description = "Devuelve una lista de alumnos por su ID de curso.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumnos encontrados"),
      @ApiResponse(responseCode = "404", description = "No se encontró el curso especificado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @GetMapping("/curso/{id}")
  public List<Alumno> getAlumnosByCurso(@PathVariable Long id) {
    return service.getAlumnosByCurso(id);
  }

  @Operation(summary = "Crear un alumno", description = "Crea un nuevo alumno.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumno actualizado correctamente"),
      @ApiResponse(responseCode = "404", description = "Alumno no encontrado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/create")
  public Alumno createAlumno(@RequestBody Alumno alumno) {
    return service.createAlumno(alumno);
  }

  @Operation(summary = "Obtener alumnos por curso y grupo", description = "Devuelve una lista de alumnos filtrados por curso y grupo.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumnos encontrados"),
      @ApiResponse(responseCode = "404", description = "No se encontró el grupo especificado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @GetMapping("/curso")
  public List<Alumno> getAlumnosByCursoAndGrupo(@RequestParam String nivel, @RequestParam String grupo) {
    if (grupo.length() != 1) {
      throw new IllegalArgumentException("El parámetro 'grupo' debe ser un único carácter.");
    }
    return service.getAlumnosByNivelAndGrupo(nivel, grupo.charAt(0));
  }

  @Operation(summary = "Eliminar un alumno", description = "Elimina un alumno por su ID.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumno eliminado correctamente"),
      @ApiResponse(responseCode = "404", description = "Alumno no encontrado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @DeleteMapping("/delete/{id}")
  public boolean deleteAlumno(@PathVariable UUID id) {
    return service.deleteAlumno(id);
  }

  @Operation(summary = "Eliminar todos los alumnos de un curso", description = "Elimina todos los alumnos asociados a un curso por su ID.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Alumnos eliminados correctamente"),
      @ApiResponse(responseCode = "404", description = "Curso no encontrado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @DeleteMapping("/deleteall/curso/{id}")
  public void deleteAllAlumnosByCurso(@PathVariable Long id) {
    service.deleteAlumnosByCurso(id);
  }
}
