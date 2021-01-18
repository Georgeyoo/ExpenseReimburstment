package com.george.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.george.controller.RequestHelper;

@WebServlet("/api/*")
public class MasterServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public MasterServlet() {
		super();
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Reached GET Master Servlet");
		RequestHelper.process(req, resp);
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Reached POST Master Servlet");
		RequestHelper.process(req, resp);
	}

	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Reached PUT Master Servlet");
		RequestHelper.process(req, resp);
	}

	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Reached DELETE Master Servlet");
		RequestHelper.process(req, resp);
	}
}
