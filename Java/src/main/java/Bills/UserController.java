package Bills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;
import java.util.Set;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BillRepository billRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private User user;
    private HttpSession session;

    @PostMapping("/auth/register")
    public User register(@RequestBody User user, HttpSession session) throws Exception {
        try {
            User newUser = userService.saveUser(user);
            session.setAttribute("username", newUser.getUsername());
            return newUser;
        } catch (Exception err) {
            throw new Exception(err.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public User login(@RequestBody User user, HttpSession session) throws Exception {
        this.user = user;
        this.session = session;
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        User userLoggingIn = userRepository.findByUsername(user.getUsername());
        boolean validLogin = bCryptPasswordEncoder.matches(user.getPassword(), userLoggingIn.getPassword());
        if (validLogin) {
            session.setAttribute("username", userLoggingIn.getUsername());
            System.out.println("is this working????");
            return userLoggingIn;
        } else {
            System.out.println("not logging in");
            throw new Exception("invalid credentials");
        }
    }

    @PutMapping("auth/track/{id}")
    public Bill trackBills(@PathVariable Integer id, HttpSession session) throws Exception {
        try{
            User userLoggedIn = userService.findUserByUsername(session.getAttribute("username").toString());
            Optional<Bill> billChosen = billRepository.findById(id);
            System.out.println("===========");
            System.out.println(billChosen);
            System.out.println(userLoggedIn);
            userLoggedIn.setTrackedBills(billChosen.get());
            userRepository.save(userLoggedIn);
            return billChosen.get();

        } catch(Exception err){
            throw new Exception(err.getMessage());
        }
    }
    @PutMapping("auth/untrack/{id}")
    public Bill unTrackBills(@PathVariable Integer id, HttpSession session) throws Exception {
        try{
            System.out.println("!!!!!!!!!");
            User userLoggedIn = userService.findUserByUsername(session.getAttribute("username").toString());
            Optional<Bill> billUntracked = billRepository.findById(id);
            System.out.println("&&&&&&&&&&");
            System.out.println(billUntracked);
            System.out.println(userLoggedIn);
            userLoggedIn.setTrackedBills(billUntracked.get());
            userRepository.save(userLoggedIn);
            return billUntracked.get();

        } catch(Exception err){
            throw new Exception(err.getMessage());
        }
    }

}


