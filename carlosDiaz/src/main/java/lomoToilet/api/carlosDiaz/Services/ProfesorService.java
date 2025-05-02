package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Configs.CryptConfig;
import lomoToilet.api.carlosDiaz.Models.Profesor;
import lomoToilet.api.carlosDiaz.Repositories.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {

  @Autowired
  private ProfesorRepository repository;

  @Autowired
  private CryptConfig crypt;

  public List<Profesor> getAllProfesores() {
    return repository.findAll();
  }

  public Optional<Profesor> loginProfesor(String email, String contrasena) {
    String emailCifrado = crypt.encrypt(email);

    Optional<Profesor> optionalProfesor = repository.findByEmail(emailCifrado);

    optionalProfesor.ifPresent(profesor -> {
      String contrasenaCifrada = crypt.encrypt(contrasena);
      if (!profesor.getContrasena().equals(contrasenaCifrada)) {
        throw new RuntimeException("Credenciales incorrectas");
      }
    });

    return optionalProfesor;
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
}
