package edu.simpson.esteban;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.System.out;

/**
 * Created by esierra on 2/14/2017.
 */
@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(PersonDAO.class.getName());

    private Pattern nameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneNumberValidationPattern;
    private Pattern birthdayValidationPattern;

    /**
     * Our constructor
     */
    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        nameValidationPattern = Pattern.compile("^(?U)[\\p{Alpha}\\-'. ]+");
        emailValidationPattern = Pattern.compile("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
        phoneNumberValidationPattern = Pattern.compile("^((\\d{3}-|\\(\\d{3}\\)\\s?)?\\d{3}-|^\\d{3}(\\.)?\\d{3}\\3)\\d{4}$");
        birthdayValidationPattern = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "Inside the servlet");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();


        boolean dataIsValid = false;

        String id = request.getParameter("id");
        String firstName = request.getParameter("fName");
        String lastName = request.getParameter("lName");
        String email = request.getParameter("email");
        String phoneNumber = request.getParameter("phoneNumber");
        String birthday = request.getParameter("dob");

        out.println("Postxx");

        Matcher firstNameMatcher = nameValidationPattern.matcher(firstName);
        Matcher lastNameMatcher = nameValidationPattern.matcher(lastName);
        Matcher emailMatcher = emailValidationPattern.matcher(email);
        Matcher phoneNumberMatcher = phoneNumberValidationPattern.matcher(phoneNumber);
        Matcher birthdayMatcher = birthdayValidationPattern.matcher(birthday);

        out.println("Second checkpoint");

        if (firstNameMatcher.find()) {
            out.println("First name valid");
            dataIsValid = true;
        } else { out.println("First name: " + firstName+ " pass validation" + firstNameMatcher.find());
        }
        if (lastNameMatcher.find()){
            out.println("Last name valid");
            dataIsValid = true;

        } else { out.println("Last name: " + lastName+ " pass validation" + lastNameMatcher.find());
        }
        if(emailMatcher.find()){
            out.println("Email valid");
            dataIsValid = true;

        } else { out.println("Email: " + email+ " pass validation" + emailMatcher.find());
        }
        if(phoneNumberMatcher.find()) {
            out.println("Phone number valid");
            dataIsValid = true;

        } else { out.println("Phone number: " + phoneNumber+ " pass validation" + phoneNumberMatcher.find());
        }
        if(birthdayMatcher.find()){
            out.println("Birthday valid");
            dataIsValid = true;

        }
        else { out.println("Birthday: " + birthday+ " pass validation" + birthdayMatcher.find());
        }
        out.println("id: " + id);

        out.println(firstName + lastName + email + phoneNumber + birthday);
        if(dataIsValid && (id.equals(null) || id.equals(""))) {
            out.print("Inserting Row with id:" + id + "and name: " + firstName + " " + lastName);
            PersonDAO.insertPeople(firstName, lastName, email, phoneNumber, birthday);
        }
        else if(dataIsValid && (!id.equals(null) || !id.equals(""))){
            String idTrim = id.trim();
            int idInt = Integer.parseInt(idTrim);
            out.print("Updating Row with id:" + id + "and name: " + firstName + " " + lastName);
            PersonDAO.updatePeople(idInt, firstName, lastName, email, phoneNumber, birthday);
        } else {
            out.println("No Person Update or Insert. ");
        }

    }
}
