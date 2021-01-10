package com.george.service;

import java.util.List;

import com.george.dao.EmployeeDao;
import com.george.dao.EmployeeDaoImpl;
import com.george.dao.TicketDao;
import com.george.dao.TicketDaoImpl;
import com.george.model.Employee;
import com.george.model.Ticket;

public class Service {

	private static EmployeeDao eDao = new EmployeeDaoImpl();
	private static TicketDao tDao = new TicketDaoImpl();

	// Get User by Email
	public Employee getUserByEmail(String email) {
		if (!(eDao.selectEmployeeByEmail(email) == null)) {
			return eDao.selectEmployeeByEmail(email);
		} else {
			return null;
		}
	}

	// Get User by ID
	public Employee getUserById(int i) {
		if (!(eDao.selectEmployeeById(i) == null)) {
			return eDao.selectEmployeeById(i);
		} else {
			return null;
		}
	}

	// Register User
	public boolean registerUser(Employee emp) {
		System.out.println("reached Service");
		if (eDao.insertEmployee(emp)) {
			System.out.println("Successfully Registered!");
			return true;
		} else {
			System.out.println("User with that email already exists!");
			return false;
		}
	}

	// Get all tickets by Userid
	public List<Ticket> getTicketByUserId(int id) {
		System.out.println("Reached Service");
		return tDao.selectTicketById(id);
	}

	// Get all tickets by Email
	public List<Ticket> getTicketByUserEmail(String email) {
		System.out.println("Reached Service");
		return tDao.selectTicketByEmail(email);
	}

	// Get all tickets NOT by current FM
	public List<Ticket> getTicketNotByUserId(int id) {
		System.out.println("Reached Service");
		return tDao.selectAllTicketsNotByCurrentFM(id);
	}

	// Post new ticket
	public boolean postTicket(Ticket t) {
		System.out.println("Reached service");
		if (tDao.insertTicket(t)) {
			System.out.println("Service: Ticket Successfully Created: " + t);
			return true;
		} else {
			System.out.println("Service: Ticket Creation Failed");
			return false;
		}
	}

	// Approve Ticket
	public boolean putTicketApprove(int id) {
		System.out.println("Reached service");
		if (tDao.putTicketApprove(id)) {
			System.out.println("Ticket Successfully updated");
			return true;
		} else {
			System.out.println("Ticket update Failed");
			return false;
		}
	}

	// Reject Ticket
	public boolean putTicketReject(int id) {
		System.out.println("Reached service");
		if (tDao.putTicketReject(id)) {
			System.out.println("Ticket Successfully updated");
			return true;
		} else {
			System.out.println("Ticket update Failed");
			return false;
		}
	}
}
