package lomoToilet.api.carlosDiaz.Repositories;

import lomoToilet.api.carlosDiaz.Models.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
}
