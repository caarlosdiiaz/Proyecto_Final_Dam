package lomoToilet.api.carlosDiaz.Controllers;

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

  @PostMapping("/crear")
  public Registro crearRegistro(Registro registro) {
    return service.saveRegistro(registro);
  }
}
