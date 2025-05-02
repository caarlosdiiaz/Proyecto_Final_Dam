package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Repositories.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistroService {

  @Autowired
  private RegistroRepository repository;
}
