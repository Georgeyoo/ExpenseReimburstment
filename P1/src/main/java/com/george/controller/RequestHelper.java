package com.george.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestHelper {

	public static void process(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String endpoint = req.getRequestURI();
		System.out.println(endpoint);

		switch (endpoint) {
		case "/P1/api/admin/approve":
			TicketController.approveTicket(req, resp);
			break;
		case "/P1/api/admin/reject":
			TicketController.rejectTicket(req, resp);
			break;
		case "/P1/api/admin/ticket":
			switch (req.getMethod()) {
			case "GET":
				TicketController.getAllTicketsNotByFM(req, resp);
				break;
			}
			break;
		case "/P1/api/admin/ticketByEmail":
			TicketController.getAllTicketsByEmail(req, resp);
			break;
		case "/P1/api/ticket":
			switch (req.getMethod()) {
			case "GET":
				TicketController.getAllTicketsByUserId(req, resp);
				break;
			case "POST":
				System.out.println("Reached RH");
				TicketController.insertTicket(req, resp);
				break;
			}
			break;
		case "/P1/api/home":
			HomeController.getHomePage(req, resp);
			break;
		case "/P1/api/landing":
			LoginController.getLandingPage(req, resp);
			System.out.println("Hit landing route!");
			break;
		case "/P1/api/login":
			LoginController.login(req, resp);
			break;
		case "/P1/api/logout":
			LoginController.logout(req, resp);
			break;
		case "/P1/api/employee":
			switch (req.getMethod()) {
			case "GET":
				System.out.println("Reached Employee GET");
				break;
			case "POST":
				System.out.println("Reached RH");
				EmployeeController.postUser(req, resp);
				break;
			}
		case "/P1/api/index.js":
//			resp.sendRedirect("http://localhost:8080/P1/assets/index.js");
			break;
		default:
			System.out.println("Didn't hit any RH routes");
			break;
		}
	}
}
