package com.george.dao;

import java.util.List;

import com.george.model.Ticket;

public interface TicketDao {

	// Get Tickets by Id
	public List<Ticket> selectTicketById(int id);

	// Get Tickets By Name
	public List<Ticket> selectTicketByEmail(String email);

	// Get All Tickets Not Belonging to Current User (Finance Managers only)
	public List<Ticket> selectAllTicketsNotByCurrentFM(int id);

	// Insert New Tickets (Default to status: false, isRejected: false)
	public boolean insertTicket(Ticket t);

	// Update Tickets: Approve or Reject
	public boolean putTicketApprove(int id);

	// Update Tickets: Approve or Reject
	public boolean putTicketReject(int id);

	// Delete Ticket?
}
