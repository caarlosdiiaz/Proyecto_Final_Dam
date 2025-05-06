package lomoToilet.api.carlosDiaz.Dtos;

import java.util.UUID;

public class ProfesorDto {

  private UUID id;
  private String nombre;
  private String apellidos;
  private String email;
  private String telefono;
  private boolean admin;

  public ProfesorDto() {
  }

  public ProfesorDto(UUID id, String nombre, String apellidos, String email, String telefono, boolean admin) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.telefono = telefono;
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

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
