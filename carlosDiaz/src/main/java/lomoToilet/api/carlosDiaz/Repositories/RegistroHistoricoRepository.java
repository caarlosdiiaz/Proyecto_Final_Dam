package lomoToilet.api.carlosDiaz.Repositories;

import lomoToilet.api.carlosDiaz.Models.RegistroHistorico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RegistroHistoricoRepository extends JpaRepository<RegistroHistorico, Long> {
  @Query("SELECT rh FROM RegistroHistorico rh WHERE rh.fechaHora BETWEEN :inicio AND :fin")
  List<RegistroHistorico> findByFechaHoraBetween(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
}