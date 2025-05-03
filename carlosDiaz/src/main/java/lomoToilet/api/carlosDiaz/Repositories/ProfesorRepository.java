package lomoToilet.api.carlosDiaz.Repositories;

import lomoToilet.api.carlosDiaz.Models.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, UUID> {

  Optional<Profesor> findById(UUID id);

  Optional<Profesor> findByEmail(String email);

  Optional<Profesor> findByTelefono(String telefono);
}
