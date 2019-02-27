package Bills;

import javax.persistence.*;

@Entity
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Long summary;
    private String state;
    private Long proposed;
    private Long lastAction;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getSummary() {
        return summary;
    }

    public void setSummary(Long summary) {
        this.summary = summary;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getProposed() {
        return proposed;
    }

    public void setProposed(Long proposed) {
        this.proposed = proposed;
    }

    public Long getLastAction() {
        return lastAction;
    }

    public void setLastAction(Long lastAction) {
        this.lastAction = lastAction;
    }

    public int getTrackingCount() {
        return trackingCount;
    }

    public void setTrackingCount(int trackingCount) {
        this.trackingCount = trackingCount;
    }

    private int trackingCount;

}
