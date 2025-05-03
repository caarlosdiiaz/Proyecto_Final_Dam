package lomoToilet.api.carlosDiaz.Configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI customOpenApi() {
    return new OpenAPI()
        .info(new Info()
            .title("Lomo toilet API documentation")
            .version("1.0.0")
            .description("Aquí encontrarás la documentación de la API de lomo toilet")
        );
  }
}