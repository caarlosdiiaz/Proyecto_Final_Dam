package lomoToilet.api.carlosDiaz.Models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "registros_historicos")
public class RegistroHistorico {

  @Id
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(name = "alumno_id", nullable = false)
  private UUID alumnoId;

  @Column(name = "profesor_id", nullable = false)
  private UUID profesorId;

  @Column(name = "fecha_hora", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime fechaHora;

  public RegistroHistorico() {
    this.fechaHora = LocalDateTime.now();
  }

  public RegistroHistorico(UUID alumnoId, UUID profesorId, LocalDateTime fechaHora) {
    this.alumnoId = alumnoId;
    this.profesorId = profesorId;
    this.fechaHora = LocalDateTime.now();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public UUID getAlumnoId() {
    return alumnoId;
  }

  public void setAlumnoId(UUID alumnoId) {
    this.alumnoId = alumnoId;
  }

  public UUID getProfesorId() {
    return profesorId;
  }

  public void setProfesorId(UUID profesorId) {
    this.profesorId = profesorId;
  }

  public LocalDateTime getFechaHora() {
    return fechaHora;
  }

  public void setFechaHora(LocalDateTime fechaHora) {
    this.fechaHora = fechaHora;
  }
}
