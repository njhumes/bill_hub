package Bills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillController {

    @Autowired
    private BillRepository billRepository;

    @GetMapping("/bills/findBill")
    public Iterable<Bill> billIndex() {
        return billRepository.findAll();
    }
    @GetMapping("/trending")
    public Iterable<Bill> trendingBills() {
        return billRepository.findAll();
    }



}


