package Bills;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BillRepository extends CrudRepository<Bill, Long> {

    Optional<Bill> findById(Integer id);
}
