package lomoToilet.api.carlosDiaz.Models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "cursos")
public class Curso {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(name = "nivel", nullable = false, length = 13)
  private String nivel;

  @Column(name = "grupo", nullable = false, length = 1)
  private Character grupo;

  @Column(name = "tutor_id", nullable = false)
  private UUID tutorId;

  public Curso() {
  }

  public Curso(String nivel, Character grupo, UUID tutorId) {
    this.nivel = nivel;
    this.grupo = grupo;
    this.tutorId = tutorId;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNivel() {
    return nivel;
  }

  public void setNivel(String nivel) {
    this.nivel = nivel;
  }

  public Character getGrupo() {
    return grupo;
  }

  public void setGrupo(Character grupo) {
    this.grupo = grupo;
  }

  public UUID getTutorId() {
    return tutorId;
  }

  public void setTutorId(UUID tutorId) {
    this.tutorId = tutorId;
  }
}
