package lomoToilet.api.carlosDiaz.Repositories;

import lomoToilet.api.carlosDiaz.Models.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {

}
