package Bills;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String summary;
    private String state;
    private String proposed;
    private String last_action;
    private String tracking_count;

    @ManyToMany(mappedBy = "trackedBills")
    private Set<User> tracks;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getProposed() {
        return proposed;
    }

    public void setProposed(String proposed) {
        this.proposed = proposed;
    }

    public String getLastAction() {
        return last_action;
    }

    public void setLastAction(String last_action) {
        this.last_action = last_action;
    }

    public String getTrackingCount() {
        return tracking_count;
    }

    public void setTrackingCount(String tracking_count) {
        this.tracking_count = tracking_count;
    }
}
