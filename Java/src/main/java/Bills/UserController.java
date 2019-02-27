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
    private User user;
    private HttpSession session;

    @PostMapping("/auth/register")
    public User register(@RequestBody User user, HttpSession session) throws Exception{
        try{
            User newUser = userService.saveUser(user);
            session.setAttribute("username", newUser.getUsername());
            return newUser;
        }catch(Exception err){
            throw new Exception(err.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public User login(@RequestBody User user, HttpSession session) throws Exception{
        this.user = user;
        this.session = session;
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        User userLoggingIn = userRepository.findByUsername(user.getUsername());
        boolean validLogin = bCryptPasswordEncoder.matches(user.getPassword(), userLoggingIn.getPassword());
        if(validLogin){
            session.setAttribute("username", userLoggingIn.getUsername());
            System.out.println("is this working????");
            return userLoggingIn;
        }else{
            System.out.println("not logging in");
            throw new Exception("invalid credentials");
        }
    }

    @PutMapping("auth/track/{id}")
    public void trackBills(@PathVariable Long id) throws Exception {
        Optional<Bill> billChosen = billRepository.findById(id);
        System.out.println(billChosen);
    }


}

