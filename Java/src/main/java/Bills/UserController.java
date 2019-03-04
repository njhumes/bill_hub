package Bills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BillRepository billRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private Users users;
    private HttpSession session;

    @PostMapping("/auth/register")
    public Users register(@RequestBody Users users, HttpSession session) throws Exception {
        try {
            Users newUsers = userService.saveUser(users);
            session.setAttribute("username", newUsers.getUsername());
            return newUsers;
        } catch (Exception err) {
            throw new Exception(err.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public Users login(@RequestBody Users users, HttpSession session) throws Exception {
        this.users = users;
        this.session = session;
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Users usersLoggingIn = userRepository.findByUsername(users.getUsername());
        boolean validLogin = bCryptPasswordEncoder.matches(users.getPassword(), usersLoggingIn.getPassword());
        if (validLogin) {
            session.setAttribute("username", usersLoggingIn.getUsername());
            System.out.println("is this working????");
            return usersLoggingIn;
        } else {
            System.out.println("not logging in");
            throw new Exception("invalid credentials");
        }
    }

    @PutMapping("auth/track/{id}")
    public Bill trackBills(@PathVariable Integer id, HttpSession session) throws Exception {
        try{
            Users usersLoggedIn = userService.findUserByUsername(session.getAttribute("username").toString());
            Optional<Bill> billChosen = billRepository.findById(id);
            System.out.println("===========");
            System.out.println(billChosen);
            System.out.println(usersLoggedIn);
            usersLoggedIn.setTrackedBills(billChosen.get());
            userRepository.save(usersLoggedIn);
            return billChosen.get();

        } catch(Exception err){
            throw new Exception(err.getMessage());
        }
    }
    @PutMapping("auth/untrack/{id}")
    public Bill unTrackBills(@PathVariable Integer id, HttpSession session) throws Exception {
        try{
            System.out.println("!!!!!!!!!");
            Users usersLoggedIn = userService.findUserByUsername(session.getAttribute("username").toString());
            Optional<Bill> billUntracked = billRepository.findById(id);
            System.out.println("&&&&&&&&&&");
            System.out.println(billUntracked);
            System.out.println(usersLoggedIn);
            usersLoggedIn.setTrackedBills(billUntracked.get());
            userRepository.save(usersLoggedIn);
            return billUntracked.get();

        } catch(Exception err){
            throw new Exception(err.getMessage());
        }
    }

}


