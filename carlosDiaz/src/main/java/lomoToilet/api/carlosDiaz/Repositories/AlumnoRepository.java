package lomoToilet.api.carlosDiaz.Repositories;

import lomoToilet.api.carlosDiaz.Models.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, UUID> {

  @Query("SELECT a FROM Alumno a JOIN Curso c ON a.cursoId = c.id WHERE c.nivel = :nivel AND c.grupo = :grupo")
  List<Alumno> findAlumnosByNivelAndGrupo(@Param("nivel") String nivel, @Param("grupo") Character grupo);
}