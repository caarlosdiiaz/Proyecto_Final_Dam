package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Models.EmailRequest;
import lomoToilet.api.carlosDiaz.Services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

  private final EmailService emailService;

  public EmailController(EmailService emailService) {
    this.emailService = emailService;
  }

  @Operation(summary = "Enviar un correo electrónico", description = "Envía un correo electrónico a dirección con un mensaje.")
  @ApiResponses(value ={
      @ApiResponse(responseCode = "200", description = "Correo electrónico enviado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al enviar el correo electrónico"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/enviar")
  public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
    try {
      emailService.setProfesor(emailRequest.getProfesor());
      emailService.setMensaje(emailRequest.getMensaje());

      new Thread(emailService).start();

      return ResponseEntity.ok("Email enviado correctamente.");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el email.");
    }
  }
}