package lomoToilet.api.carlosDiaz.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "alumnos")
public class Alumno {

  @Id
  @UuidGenerator
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Column(name = "nombre", nullable = false, length = 20)
  private String nombre;

  @Column(name = "apellidos", nullable = false, length = 50)
  private String apellidos;

  @Column(name = "num_lista", nullable = false)
  private Integer numLista;

  @Column(name = "repetidor", nullable = false)
  private Boolean repetidor;

  @Column(name = "curso_id", nullable = false)
  private Long cursoId;

  public Alumno() {
  }

  public Alumno(String nombre, String apellidos, Integer numLista, Boolean repetidor, Long cursoId) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.numLista = numLista;
    this.repetidor = repetidor;
    this.cursoId = cursoId;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getApellidos() {
    return apellidos;
  }

  public void setApellidos(String apellidos) {
    this.apellidos = apellidos;
  }

  public Boolean getRepetidor() {
    return repetidor;
  }

  public void setRepetidor(Boolean repetidor) {
    this.repetidor = repetidor;
  }

  public Long getCursoId() {
    return cursoId;
  }

  public void setCursoId(Long cursoId) {
    this.cursoId = cursoId;
  }

  public Integer getNumLista() {
    return numLista;
  }

  public void setNumLista(Integer numLista) {
    this.numLista = numLista;
  }
}
