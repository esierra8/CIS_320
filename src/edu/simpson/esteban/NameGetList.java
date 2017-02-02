package edu.simpson.esteban;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by esierra on 1/31/2017.
 */


@javax.servlet.annotation.WebServlet(name = "NameGetList")
public class NameGetList extends javax.servlet.http.HttpServlet {
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        // Get setup up to output JSON text
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Use our DAO to get a list of people
        List <Person> peopleList = PersonDAO.getPeople();

        // Create an instance of the Google class that can convert
        // business object to JSON strings.
        Gson gson = new Gson();

        // Go ahead and turn peopleList into a JSON string
        String json = gson.toJson(peopleList);

        // Write out that string
        out.println(json);
    }
}
