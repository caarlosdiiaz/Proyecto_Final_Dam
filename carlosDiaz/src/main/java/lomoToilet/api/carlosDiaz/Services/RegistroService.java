package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Dtos.AlumnoRegistroDTO;
import lomoToilet.api.carlosDiaz.Models.Alumno;
import lomoToilet.api.carlosDiaz.Models.Curso;
import lomoToilet.api.carlosDiaz.Models.Registro;
import lomoToilet.api.carlosDiaz.Repositories.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RegistroService {

  @Autowired
  private RegistroRepository repository;
  @Autowired
  private AlumnoService alumnoService;
  @Autowired
  private CursoService cursoService;

  public List<Registro> getAllRegistros() {
    return repository.findAll();
  }

  public Registro saveRegistro(Registro registro) {
    return repository.save(registro);
  }

  public List<Registro> getRegistrosEntreFechas(LocalDateTime inicio, LocalDateTime fin) {
    return repository.findByFechaHoraBetween(inicio, fin);
  }

  public ResponseEntity<List<AlumnoRegistroDTO>> obtenerAlumnosRegistrosDeRegistros(
      String fechaInicio, String fechaFin, RegistroService registroService) {
    try {
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
      LocalDateTime inicio = LocalDate.parse(fechaInicio, formatter).atStartOfDay();
      LocalDateTime fin = LocalDate.parse(fechaFin, formatter).atTime(23, 59, 59);

      List<Registro> registros = registroService.getRegistrosEntreFechas(inicio, fin);

      if (registros.isEmpty()) {
        return ResponseEntity.status(404).body(null);
      }

      List<AlumnoRegistroDTO> resultado = registros.stream()
          .collect(Collectors.groupingBy(Registro::getAlumnoId))
          .entrySet().stream()
          .map(entry -> {
            UUID alumnoId = entry.getKey();
            List<Registro> registrosAlumno = entry.getValue();
            Optional<Alumno> alumno = alumnoService.getAlumnoById(alumnoId);
            if (alumno.isEmpty()) {
              throw new RuntimeException("Alumno no encontrado: " + alumnoId);
            }
            Optional<Curso> curso = cursoService.getCursoById(alumno.get().getCursoId());
            if (curso.isEmpty()) {
              throw new RuntimeException("Curso no encontrado para el alumno: " + alumnoId);
            }
            return new AlumnoRegistroDTO(
                alumnoId,
                alumno.get().getNombre() + " " + alumno.get().getApellidos(),
                registrosAlumno.size(),
                curso.get().getNivel() + " " + curso.get().getGrupo()
            );
          })
          .sorted((a, b) -> Integer.compare(b.getCantidad(), a.getCantidad()))
          .collect(Collectors.toList());

      return ResponseEntity.ok(resultado);
    } catch (DateTimeParseException e) {
      return ResponseEntity.status(400).body(null);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(null);
    }
  }
}