package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Models.Registro;
import lomoToilet.api.carlosDiaz.Services.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registros")
public class RegistroController {

  @Autowired
  private RegistroService service;

  @Operation(summary = "Crear un nuevo registro", description = "Registra un nuevo registro en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Registro creado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al crear el registro"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/create")
  public Registro crearRegistro(Registro registro) {
    return service.saveRegistro(registro);
  }
}
