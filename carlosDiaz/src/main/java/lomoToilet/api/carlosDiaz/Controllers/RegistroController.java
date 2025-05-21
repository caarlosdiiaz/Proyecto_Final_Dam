package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Dtos.AlumnoRegistroDTO;
import lomoToilet.api.carlosDiaz.Dtos.FechasDTO;
import lomoToilet.api.carlosDiaz.Models.Registro;
import lomoToilet.api.carlosDiaz.Models.RegistroHistorico;
import lomoToilet.api.carlosDiaz.Services.RegistroHistoricoService;
import lomoToilet.api.carlosDiaz.Services.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/registros")
public class RegistroController {

  @Autowired
  private RegistroService registroService;

  @Autowired
  private RegistroHistoricoService registroHistoricoService;

  @Operation(summary = "Endpoint para obtener todos los registros", description = "Este endpoint devuelve una lista de todos los registros.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Registros obtenidos exitosamente"),
      @ApiResponse(responseCode = "500", description = "Error al obtener los registros")
  })
  @GetMapping("/all")
  public List<Map<String, Object>> getAllRegistros() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    return registroService.getAllRegistros().stream().map(registro -> {
      Map<String, Object> registroMap = new HashMap<>();
      registroMap.put("id", registro.getId());
      registroMap.put("alumnoId", registro.getAlumnoId());
      registroMap.put("profesorId", registro.getProfesorId());
      registroMap.put("fechaHora", registro.getFechaHora().toLocalDate().format(formatter));
      return registroMap;
    }).collect(Collectors.toList());
  }

  @Operation(summary = "Endpoint para crear un registro y un registro histórico",
      description = "Este endpoint crea un registro y un registro historico con los mismos datos.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Registro y RegistroHistorico creados exitosamente"),
      @ApiResponse(responseCode = "400", description = "Solicitud con cuerpo mal formado o datos inválidos"),
      @ApiResponse(responseCode = "500", description = "Error al crear el registro y registro historico")
  })
  @PostMapping("/crear")
  public ResponseEntity<Map<String, String>> crearRegistroYRegistroHistorico(@RequestBody Registro registro) {
    Map<String, String> response = new HashMap<>();
    try {
      // Guardar el registro normal
      Registro registroGuardado = registroService.saveRegistro(registro);

      // Crear y guardar el registro histórico
      RegistroHistorico registroHistorico = new RegistroHistorico();
      registroHistorico.setId(registroGuardado.getId());
      registroHistorico.setAlumnoId(registroGuardado.getAlumnoId());
      registroHistorico.setProfesorId(registroGuardado.getProfesorId());
      registroHistorico.setFechaHora(registroGuardado.getFechaHora());
      registroHistoricoService.saveRegistro(registroHistorico);

      response.put("message", "Registro creado exitosamente");
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      response.put("error", "Error al crear el registro: " + e.getMessage());
      return ResponseEntity.status(500).body(response);
    }
  }

  @PostMapping("/alumnos-registros")
  public ResponseEntity<List<AlumnoRegistroDTO>> getAlumnosRegistros(@RequestBody FechasDTO fechasDTO) {
    return registroService.obtenerAlumnosRegistrosDeRegistros(
        fechasDTO.getFechaInicio(), fechasDTO.getFechaFin(), registroService
    );
  }
}