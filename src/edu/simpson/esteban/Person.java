package edu.simpson.esteban;

import java.util.Date;

/**
 * Created by esierra on 1/30/2017.
 */
public class Person {

    private int id;
    private String first;
    private String last;
    private String email;
    private String phone;
    private Date birthday;

    public int getId() {return id; }
    public void setId(int id) { this.id = id; }

    public String getFirst() {return first; }
    public void setFirst(String first) {this.first = first; }

    public String getLast() {return last; }
    public void setLast(String last) {this.last = last; }

    public String getPhone() {return phone; }
    public void setPhone(String phone) {this.phone = phone; }

    public String Email() {return email; }
    public void setEmail(String email) {this.email = email; }

    public Date getBirthday() {return birthday; }
    public void setBirthday(Date birthday) {this.birthday = birthday; }
}
