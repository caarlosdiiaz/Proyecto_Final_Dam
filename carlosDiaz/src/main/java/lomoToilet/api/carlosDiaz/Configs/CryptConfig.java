package lomoToilet.api.carlosDiaz.Configs;

import io.github.cdimascio.dotenv.Dotenv;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.salt.ZeroSaltGenerator;
import org.springframework.stereotype.Component;

@Component
public class CryptConfig {
  private static final Dotenv env = Dotenv.load();
  private static final String claveSecreta = env.get("SECRET_KEY");
  private static final String algoritm = env.get("CRYPT_ALGORITHM");
  private static final StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();

  static {
    assert claveSecreta != null;
    encryptor.setPassword(claveSecreta);
    encryptor.setAlgorithm(algoritm);
    encryptor.setSaltGenerator(new ZeroSaltGenerator());
  }

  public String encrypt(String texto) {
    return encryptor.encrypt(texto);
  }

  public String decrypt(String textoCifrado) {
    return encryptor.decrypt(textoCifrado);
  }
}
