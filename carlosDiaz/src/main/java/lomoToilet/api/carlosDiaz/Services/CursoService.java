package lomoToilet.api.carlosDiaz.Services;

import lomoToilet.api.carlosDiaz.Repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService {

  @Autowired
  private CursoRepository repository;
}
