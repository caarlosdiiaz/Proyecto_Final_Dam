package lomoToilet.api.carlosDiaz.Repositories;

import lomoToilet.api.carlosDiaz.Models.RegistroHistorico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroHistoricoRepository extends JpaRepository<RegistroHistorico, Long> {
}
