package lomoToilet.api.carlosDiaz;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class CarlosDiazApplication {

	public static void main(String[] args) {
		Dotenv env = Dotenv.configure().load();

		System.setProperty("DB_URL", Objects.requireNonNull(env.get("DB_URL")));
		System.setProperty("DB_USERNAME", Objects.requireNonNull(env.get("DB_USERNAME")));
		System.setProperty("DB_PASSWORD", Objects.requireNonNull(env.get("DB_PASSWORD")));
		SpringApplication.run(CarlosDiazApplication.class, args);
	}

}
