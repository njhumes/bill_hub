package Bills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Users findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Users saveUser(Users users) {
        users.setPassword(bCryptPasswordEncoder.encode(users.getPassword()));
        userRepository.save(users);
        return users;
    }

}

