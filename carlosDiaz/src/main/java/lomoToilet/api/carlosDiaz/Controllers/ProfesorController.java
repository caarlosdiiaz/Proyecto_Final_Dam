package lomoToilet.api.carlosDiaz.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lomoToilet.api.carlosDiaz.Dtos.LoginDto;
import lomoToilet.api.carlosDiaz.Dtos.ProfesorDto;
import lomoToilet.api.carlosDiaz.Dtos.UpdatePasswordDto;
import lomoToilet.api.carlosDiaz.Dtos.UpdateProfesorContactDto;
import lomoToilet.api.carlosDiaz.Models.Profesor;
import lomoToilet.api.carlosDiaz.Services.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

  @Autowired
  private ProfesorService service;

  @Operation(summary = "Obtener todos los profesores", description = "Devuelve una lista de todos los profesores registrados.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Lista de profesores obtenida correctamente"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @GetMapping("/all")
  public Iterable<Profesor> getAllProfesores() {
    return service.getAllProfesores();
  }

  @Operation(summary = "Iniciar sesión como profesor", description = "Permite a un profesor iniciar sesión con su email y contraseña.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Inicio de sesión exitoso"),
      @ApiResponse(responseCode = "401", description = "Credenciales incorrectas"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/login")
  public ResponseEntity<ProfesorDto> loginProfesor(@RequestBody LoginDto loginDto) {
    Optional<ProfesorDto> profesor = service.loginProfesor(loginDto.getEmail(), loginDto.getContrasena());
    return profesor.map(p -> {
      ProfesorDto profesorDto = new ProfesorDto(
          p.getId(),
          p.getNombre(),
          p.getApellidos(),
          p.getEmail(),
          p.getTelefono(),
          p.isAdmin()
      );
      return ResponseEntity.ok(profesorDto);
    }).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }

  @Operation(summary = "Crear un nuevo profesor", description = "Registra un nuevo profesor en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Profesor creado correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al crear el profesor"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PostMapping("/create")
  public ResponseEntity<String> createProfesor(@RequestBody Profesor profesor) {
    try {
      service.crearProfesor(profesor);
      return ResponseEntity.ok("Profesor creado correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear el profesor");
    }
  }

  @Operation(summary = "Actualizar información de contacto del profesor", description = "Actualiza el email y/o teléfono de un profesor.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Información de contacto actualizada correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al actualizar la información de contacto"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PutMapping("/update-login/{id}")
  public ResponseEntity<String> updateProfesor(@PathVariable UUID id, @RequestBody UpdateProfesorContactDto updateProfesorContactDto) {
    try {
      service.actualizarProfesor(id, updateProfesorContactDto.getEmail(), updateProfesorContactDto.getTelefono());
      return ResponseEntity.ok("E-mail y/o telefono actualizado correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @Operation(summary = "Actualizar contraseña del profesor", description = "Actualiza la contraseña de un profesor.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Contraseña actualizada correctamente"),
      @ApiResponse(responseCode = "400", description = "Error al actualizar la contraseña"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @PutMapping("update-password/{id}")
  public ResponseEntity<String> actualizarContrasena(@PathVariable UUID id, @RequestBody UpdatePasswordDto passwordDto) {
    try {
      service.actualizarContrasena(id, passwordDto.getContrasena());
      return ResponseEntity.ok("Contraseña actualizada correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @Operation(summary = "Eliminar un profesor por ID", description = "Elimina un profesor específico por su ID.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Profesor eliminado correctamente"),
      @ApiResponse(responseCode = "404", description = "Profesor no encontrado"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> deleteProfesor(@PathVariable UUID id) {
    try {
      service.deleteProfesorById(id);
      return ResponseEntity.ok("Profesor eliminado correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @Operation(summary = "Eliminar todos los profesores", description = "Elimina todos los profesores registrados en el sistema.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Todos los profesores eliminados correctamente"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  @DeleteMapping("/delete-all")
  public ResponseEntity<String> deleteAllProfesores() {
    try {
      service.deleteAllProfesores();
      return ResponseEntity.ok("Todos los profesores eliminados correctamente");
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar los profesores");
    }
  }
}
