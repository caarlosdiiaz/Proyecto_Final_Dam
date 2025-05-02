package lomoToilet.api.carlosDiaz.Models;

import jakarta.persistence.*;

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
  private Long tutorId;

  public Curso() {
  }

  public Curso(String nivel, Character grupo, Long tutorId) {
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

  public Long getTutorId() {
    return tutorId;
  }

  public void setTutorId(Long tutorId) {
    this.tutorId = tutorId;
  }
}
