package lomoToilet.api.carlosDiaz.Services;

import io.github.cdimascio.dotenv.Dotenv;
import org.apache.commons.mail.HtmlEmail;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Objects;

@Service
public class EmailService implements Runnable {
  @Autowired
  private TemplateEngine templateEngine;

  private final Dotenv env = Dotenv.configure().load();

  private String profesor;
  private String mensaje;

  private final String emailFrom = Objects.requireNonNull(env.get("EMAIL_FROM"), "EMAIL_FROM no está configurado en el archivo .env");
  private final String emailPass = Objects.requireNonNull(env.get("EMAIL_PASS"), "EMAIL_PASS no está configurado en el archivo .env");
  private final String emailTo = Objects.requireNonNull(env.get("EMAIL_TO"), "EMAIL_TO no está configurado en el archivo .env");
  private final String emailServer = Objects.requireNonNull(env.get("EMAIL_SERVER"), "EMAIL_SERVER no está configurado en el archivo .env");
  private final String emailPort = Objects.requireNonNull(env.get("EMAIL_PORT"), "EMAIL_PORT no está configurado en el archivo .env");

  public void sendEmail() {
    try {
      // Crear el contexto de Thymeleaf
      Context context = new Context();
      context.setVariable("nombreProfesor", profesor);
      context.setVariable("contenido", mensaje);

      // Formatear fecha y hora
      LocalDateTime now = LocalDateTime.now();
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
      String fechaHoraFormateada = now.format(formatter);
      context.setVariable("horaDia", fechaHoraFormateada);

      // Procesar la plantilla HTML
      String emailContent = templateEngine.process("EmailTemplate", context);

      // Configurar el correo
      HtmlEmail email = new HtmlEmail();
      email.setHostName(emailServer);

      if (emailPort.isEmpty()) {
        throw new IllegalArgumentException("La variable de entorno EMAIL_PORT no está configurada.");
      }
      email.setSmtpPort(Integer.parseInt(emailPort));
      email.setAuthentication(emailFrom, emailPass);
      email.setStartTLSEnabled(true);

      email.setFrom(emailFrom, "Lomo Toilet API");
      email.addTo(emailTo);
      email.setSubject("Lomo Toilet API - ⚠️ Notificación de incidencia notificada por: " + profesor);

      // Establecer el contenido HTML
      email.setHtmlMsg(emailContent);

      // Enviar el correo
      email.send();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void run() {
    sendEmail();
  }

  public EmailService() {
  }

  public EmailService(String profesor, String mensaje) {
    this.profesor = profesor;
    this.mensaje = mensaje;
  }

  public String getMensaje() {
    return mensaje;
  }

  public void setMensaje(String mensaje) {
    this.mensaje = mensaje;
  }

  public String getProfesor() {
    return profesor;
  }

  public void setProfesor(String profesor) {
    this.profesor = profesor;
  }
}