package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Configs.CryptConfig;
import lomoToilet.api.carlosDiaz.Dtos.ProfesorDto;
import lomoToilet.api.carlosDiaz.Models.Profesor;
import lomoToilet.api.carlosDiaz.Repositories.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfesorService {

  @Autowired
  private ProfesorRepository repository;

  @Autowired
  private CryptConfig crypt;

  public List<Profesor> getAllProfesores() {
    return repository.findAll();
  }

  public Optional<ProfesorDto> loginProfesor(String email, String contrasena) {
    String emailCifrado = crypt.encrypt(email);

    Optional<Profesor> optionalProfesor = repository.findByEmail(emailCifrado);

    optionalProfesor.ifPresent(profesor -> {
      String contrasenaCifrada = crypt.encrypt(contrasena);
      if (!profesor.getContrasena().equals(contrasenaCifrada)) {
        throw new RuntimeException("Credenciales incorrectas");
      }
    });

    return optionalProfesor.map(profesor -> {
      String emailDesencriptado = crypt.decrypt(profesor.getEmail());
      String telefonoDesencriptado = crypt.decrypt(profesor.getTelefono());

      return new ProfesorDto(
          profesor.getId(),
          profesor.getNombre(),
          profesor.getApellidos(),
          emailDesencriptado,
          telefonoDesencriptado,
          profesor.isAdmin()
      );
    });
  }

  public void crearProfesor(Profesor profesor) {
    Optional<Profesor> emailProfesor = repository.findByEmail(profesor.getEmail());
    Optional<Profesor> telefonoProfesor = repository.findByTelefono(profesor.getTelefono());

    emailProfesor.ifPresent(p -> {
      throw new RuntimeException("Credenciales en uso");
    });

    telefonoProfesor.ifPresent(p -> {
      throw new RuntimeException("Credenciales en uso");
    });

    profesor.setEmail(crypt.encrypt(profesor.getEmail()));
    profesor.setContrasena(crypt.encrypt(profesor.getContrasena()));
    profesor.setTelefono(crypt.encrypt(profesor.getTelefono()));

    repository.save(profesor);
  }

  public void actualizarProfesor(UUID id, String nuevoEmail, String nuevoTelefono) {
    Profesor profesor = repository.findById(id).orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

    repository.findByEmail(crypt.encrypt(nuevoEmail)).ifPresent(p -> {
      if (!p.getId().equals(id)) {
        throw new RuntimeException("El email ya está en uso");
      }
    });

    repository.findByTelefono(crypt.encrypt(nuevoTelefono)).ifPresent(p -> {
      if (!p.getId().equals(id)) {
        throw new RuntimeException("El teléfono ya está en uso");
      }
    });

    profesor.setEmail(crypt.encrypt(nuevoEmail));
    profesor.setTelefono(crypt.encrypt(nuevoTelefono));
    repository.save(profesor);
  }

  public void actualizarContrasena(UUID id, String contrasena) {
    if (contrasena == null || contrasena.length() < 8) {
      throw new RuntimeException("La contraseña debe tener al menos 8 caracteres");
    }

    Profesor profesor = repository.findById(id).orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
    try {
      profesor.setContrasena(crypt.encrypt(contrasena));
      repository.save(profesor);
    } catch (Exception e) {
      throw new RuntimeException("Error al actualizar la contraseña: " + e.getMessage());
    }
  }

  public void deleteProfesorById(UUID id) {
    if (!repository.existsById(id)) {
      throw new RuntimeException("Profesor no encontrado");
    }
    repository.deleteById(id);
  }

  public void deleteAllProfesores() {
    repository.deleteAll();
  }
}
