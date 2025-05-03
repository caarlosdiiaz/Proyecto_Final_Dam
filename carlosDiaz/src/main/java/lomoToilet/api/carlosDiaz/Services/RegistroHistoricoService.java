package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Models.RegistroHistorico;
import lomoToilet.api.carlosDiaz.Repositories.RegistroHistoricoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistroHistoricoService {

  @Autowired
  private RegistroHistoricoRepository repository;

  public RegistroHistorico saveRegistro(RegistroHistorico registroh) {
    return repository.save(registroh);
  }
}
