package com.george.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.george.model.Ticket;
import com.george.util.AWSConnection;

public class TicketDaoImpl implements TicketDao {

	@Override
	public List<Ticket> selectTicketById(int id) {
		List<Ticket> tick = new ArrayList<>();

		String sql = "select * from tickets left join departments on tickets.d_id = departments.d_id left join classifications on tickets.c_id = classifications.c_id left join employees on tickets.e_id = employees.e_id where tickets.e_id = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				tick.add(new Ticket(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getInt(4), rs.getString(5),
						rs.getString(6), rs.getBytes(7), rs.getTimestamp(8), rs.getTimestamp(9), rs.getBoolean(10),
						rs.getBoolean(11), rs.getString(14), rs.getString(16), rs.getString(20), rs.getDouble(12)));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return tick;

	}

	@Override
	public List<Ticket> selectTicketByEmail(String email) {
		List<Ticket> tick = new ArrayList<>();

		String sql = "select * from employees left join tickets on tickets.e_id = employees.e_id left join departments on tickets.d_id = departments.d_id left join classifications on tickets.c_id = classifications.c_id  where employees.email = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, email);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				tick.add(new Ticket(rs.getInt(8), rs.getInt(9), rs.getInt(10), rs.getInt(11), rs.getString(12),
						rs.getString(13), rs.getBytes(14), rs.getTimestamp(15), rs.getTimestamp(16), rs.getBoolean(17),
						rs.getBoolean(18), rs.getString(21), rs.getString(23), rs.getString(4), rs.getDouble(19)));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return tick;
	}

	@Override
	public List<Ticket> selectAllTicketsNotByCurrentFM(int id) {
		List<Ticket> tick = new ArrayList<>();

//		String sql = ""
		String sql = "select * from tickets left join departments on tickets.d_id = departments.d_id left join classifications on tickets.c_id = classifications.c_id left join employees on tickets.e_id = employees.e_id where NOT tickets.e_id = ? and approval_status = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, id);
			ps.setBoolean(2, false);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				tick.add(new Ticket(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getInt(4), rs.getString(5),
						rs.getString(6), rs.getBytes(7), rs.getTimestamp(8), rs.getTimestamp(9), rs.getBoolean(10),
						rs.getBoolean(11), rs.getString(14), rs.getString(16), rs.getString(20), rs.getDouble(12)));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return tick;
	}

	@Override
	public boolean insertTicket(Ticket t) {
//		String name, String desc, String image, boolean approval

		String sql = "INSERT INTO tickets (e_id, d_id, c_id, t_name, t_description, t_image, date_submitted, date_status, approval_status, is_rejected, amount) VALUES"
				+ "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, t.getUserId());
			ps.setInt(2, t.getDepartmentId());
			ps.setInt(3, t.getCategoryId());
			ps.setString(4, t.getName());
			ps.setString(5, t.getDesc());
			ps.setBytes(6, t.getImage());
			ps.setTimestamp(7, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()));
			ps.setTimestamp(8, null);
			ps.setBoolean(9, false);
			ps.setBoolean(10, false);
			ps.setDouble(11, t.getAmount());

			ps.execute();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		if (t instanceof Ticket) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean putTicketApprove(int id) {
		String sql = "UPDATE tickets SET approval_status = true, is_rejected = false, date_status = ? where t_id = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setTimestamp(1, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()));
			ps.setInt(2, id);

			ps.execute();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return true;
	}

	@Override
	public boolean putTicketReject(int id) {
		String sql = "UPDATE tickets SET approval_status = true, is_rejected = true, date_status = ? where t_id = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setTimestamp(1, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()));
			ps.setInt(2, id);

			ps.execute();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		// Re-comment later
		return true;
	}

}
