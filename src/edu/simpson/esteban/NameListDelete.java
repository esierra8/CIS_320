package edu.simpson.esteban;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;

/**
 * Created by esierra on 3/2/2017.
 */
@WebServlet(name = "NameListDelete")
public class NameListDelete extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //log.log(Level.FINE, "Inside the servlet");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        out.println("Inside delete servlet.");

        out.println("Post");

        String id = request.getParameter("id");

        out.println("ID: " + id);
        PersonDAO.deletePeople(id);

    }
}
