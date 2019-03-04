package Bills;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Optional;
import java.util.Set;

@Entity
public class Users {
    private String username;
    private String password;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "users_track_bills",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "bill_id")
    )

    private Set<Bill> tracked_bills;

    public Set<Bill> getTrackedBills() {
        return tracked_bills;
    }

    public void setTrackedBills(Bill trackedBills) {
        this.tracked_bills.add(trackedBills);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
