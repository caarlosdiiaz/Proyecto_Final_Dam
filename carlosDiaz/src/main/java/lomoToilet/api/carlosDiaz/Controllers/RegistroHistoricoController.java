package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Models.RegistroHistorico;
import lomoToilet.api.carlosDiaz.Services.RegistroHistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  @PostMapping("/crear")
  public RegistroHistorico crearRegistro(RegistroHistorico registroh) {
    return service.saveRegistro(registroh);
  }
}
