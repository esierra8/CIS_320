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

import static java.lang.System.out;

/**
 * Created by esierra on 2/14/2017.
 */
@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(PersonDAO.class.getName());
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "Inside the servlet");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        out.println("Post");


        String firstName = request.getParameter("fName");
        String lastName = request.getParameter("lName");
        String email = request.getParameter("email");
        String phoneNumber = request.getParameter("phoneNumber");
        String birthday = request.getParameter("dob");

        out.println(firstName + lastName + email + phoneNumber + birthday);
        PersonDAO.insertPeople(firstName,lastName,email,phoneNumber,birthday);


        // Just print the data out to confirm we got it.
        out.println("xxfieldname='"+firstName+"'");
    }
}
