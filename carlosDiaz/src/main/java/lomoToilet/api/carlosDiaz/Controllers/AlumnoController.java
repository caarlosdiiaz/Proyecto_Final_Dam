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
}
