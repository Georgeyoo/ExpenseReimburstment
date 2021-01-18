package com.george.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.george.model.Employee;
import com.george.service.Service;

public class EmployeeController {

	private static Service eService = new Service();

	public static void selectUserByEmail(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("GET")) {

			Employee e = null;

			resp.setContentType("application/json");

			String email = req.getParameter("email");

			e = eService.getUserByEmail(email);

			ObjectMapper om = new ObjectMapper();
			resp.getWriter().write(om.writeValueAsString(e));
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
	}

	public static void getUserById(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (req.getMethod().equals("GET")) {

			Employee e = null;

			resp.setContentType("application/json");

			int id = Integer.parseInt(req.getParameter("id"));

			e = eService.getUserById(id);

			ObjectMapper om = new ObjectMapper();
			resp.getWriter().write(om.writeValueAsString(e));
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
	}

	public static void postUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		if (req.getMethod().equals("POST")) {

			int id = 0;
			String email = req.getParameter("email");
			String fname = req.getParameter("firstName");
			String lname = req.getParameter("lastName");
			String password = req.getParameter("password");

			System.out.println("Reached Employee Controller");

			Employee e = new Employee(id, fname, lname, email, password, false, null);

			eService.registerUser(e);

			RequestDispatcher redis = req.getRequestDispatcher("/api/landing");
			redis.forward(req, resp);

			resp.setStatus(201);
		} else {
			resp.setStatus(405);
		}

	}
}
