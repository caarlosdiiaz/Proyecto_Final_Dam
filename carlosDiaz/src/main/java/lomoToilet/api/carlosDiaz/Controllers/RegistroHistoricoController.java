package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Dtos.AlumnoRegistroDTO;
import lomoToilet.api.carlosDiaz.Dtos.FechasDTO;
import lomoToilet.api.carlosDiaz.Models.RegistroHistorico;
import lomoToilet.api.carlosDiaz.Services.RegistroHistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registros-historicos")
public class RegistroHistoricoController {

  @Autowired
  private RegistroHistoricoService service;

  @Operation(summary = "Crear un nuevo registro histórico", description = "Registra un nuevo registro histórico en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Registro histórico creado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al crear el registro histórico"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/create")
  public RegistroHistorico crearRegistro(RegistroHistorico registroh) {
    return service.saveRegistro(registroh);
  }

  @Operation(summary = "Obtener registros históricos entre fechas", description = "Obtiene una lista de registros históricos entre dos fechas.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Registros históricos obtenidos correctamente"),
      @ApiResponse(responseCode = "404", description = "Error en los rangos de fechas"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/alumnos-registros")
  public ResponseEntity<List<AlumnoRegistroDTO>> getAlumnosRegistrosHistoricos(@RequestBody FechasDTO fechasDTO) {
    return service.obtenerAlumnosRegistrosDeHistoricos(fechasDTO.getFechaInicio(), fechasDTO.getFechaFin());
  }
}
