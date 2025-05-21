package lomoToilet.api.carlosDiaz.Dtos;

import java.util.UUID;

public class AlumnoRegistroDTO {
  private UUID alumnoId;
  private String nombre;
  private int cantidad;
  private String curso;

  public AlumnoRegistroDTO(UUID alumnoId, String nombre, int cantidad, String curso) {
    this.alumnoId = alumnoId;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.curso = curso;
  }

  public UUID getAlumnoId() {
    return alumnoId;
  }

  public void setAlumnoId(UUID alumnoId) {
    this.alumnoId = alumnoId;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public int getCantidad() {
    return cantidad;
  }

  public void setCantidad(int cantidad) {
    this.cantidad = cantidad;
  }

  public String getCurso() {
    return curso;
  }

  public void setCurso(String curso) {
    this.curso = curso;
  }
}
