package com.george.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.george.model.Ticket;
import com.george.service.Service;

public class TicketController {

	private static Service tService = new Service();
	private static Logger log = Logger.getLogger(TicketController.class);

	// Create new ticket
	public static void insertTicket(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		if (req.getMethod().equals("POST")) {

			ObjectMapper om = new ObjectMapper();

			Ticket t = om.readValue(req.getReader(), com.george.model.Ticket.class);

			System.out.println("Reached Ticket Controller");

			t.setUserId((Integer) req.getSession().getAttribute("currentId"));

			System.out.println("This is T before it goes to service: " + t);
			tService.postTicket(t);

			System.out.println("RH: " + t);

			RequestDispatcher redis = req.getRequestDispatcher("/client.html");
			redis.forward(req, resp);

			log.setLevel(Level.ALL);
			log.info("User: " + req.getSession().getAttribute("FirstName") + " "
					+ req.getSession().getAttribute("LastName") + ", " + req.getSession().getAttribute("Email")
					+ " has submitted a new ticket.");

			resp.setStatus(201);
		} else {
			resp.setStatus(405);
		}
	}

	// Get all tickets by Email

	public static void getAllTicketsByEmail(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("GET")) {
			List<Ticket> t = null;

			System.out.println("Reached Ticket Controller");

//			int userId = (Integer) req.getSession().getAttribute("currentId");
			String email = req.getParameter("email");

			t = tService.getTicketByUserEmail(email);

			ObjectMapper om = new ObjectMapper();
			resp.getWriter().write(om.writeValueAsString(t)); // This will parse our JAva object into a JSON

			resp.setStatus(201);
		} else {
			resp.setStatus(405);
		}
	}

	// Get all Tickets by UserId

	public static void getAllTicketsByUserId(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("GET")) {

			System.out.println("Reached Ticket Controller");

			int userId = (Integer) req.getSession().getAttribute("currentId");
			List<Ticket> t = null;

			t = tService.getTicketByUserId(userId);

			ObjectMapper om = new ObjectMapper();
			resp.getWriter().write(om.writeValueAsString(t)); // This will parse our JAva object into a JSON

			resp.setStatus(201);
		} else {
			resp.setStatus(405);
		}
	}

	// Get all Tickets NOT By Current FM
	public static void getAllTicketsNotByFM(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("GET")) {

			System.out.println("Reached Ticket Controller");

			int userId = (Integer) req.getSession().getAttribute("currentId");
			List<Ticket> t = null;

			t = tService.getTicketNotByUserId(userId);

			ObjectMapper om = new ObjectMapper();
			resp.getWriter().write(om.writeValueAsString(t)); // This will parse our JAva object into a JSON

			resp.setStatus(201);
		} else {
			resp.setStatus(405);
		}
	}

	public static void approveTicket(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("PUT")) {
			System.out.println("Reached Ticket Controller");

			int ticketId = Integer.parseInt(req.getParameter("id"));

			tService.putTicketApprove(ticketId);
			log.setLevel(Level.ALL);
			log.info("User: " + req.getSession().getAttribute("FirstName") + " "
					+ req.getSession().getAttribute("LastName") + ", " + req.getSession().getAttribute("Email")
					+ " has approved a ticket.");
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
	}

	public static void rejectTicket(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("PUT")) {
			System.out.println("Reached Ticket Controller");

			int ticketId = Integer.parseInt(req.getParameter("id"));

			tService.putTicketReject(ticketId);
			log.setLevel(Level.ALL);
			log.info("User: " + req.getSession().getAttribute("FirstName") + " "
					+ req.getSession().getAttribute("LastName") + ", " + req.getSession().getAttribute("Email")
					+ " has rejected a ticket.");
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
	}
}
