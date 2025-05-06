package lomoToilet.api.carlosDiaz.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "profesores")
public class Profesor {

  @Id
  @UuidGenerator
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Column(name = "nombre", nullable = false)
  private String nombre;

  @Column(name = "apellidos", nullable = false)
  private String apellidos;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "telefono", nullable = false)
  private String telefono;

  @Column(name = "contrasena", nullable = false, columnDefinition = "TEXT")
  private String contrasena;

  @Column(name = "admin", nullable = false)
  private boolean admin;

  public Profesor() {
  }

  public Profesor(String nombre, String apellidos, String email, String telefono, String contrasena, boolean admin) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.telefono = telefono;
    this.contrasena = contrasena;
    this.admin = admin;
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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getTelefono() {
    return telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }

  public String getContrasena() {
    return contrasena;
  }

  public void setContrasena(String contrasena) {
    this.contrasena = contrasena;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
