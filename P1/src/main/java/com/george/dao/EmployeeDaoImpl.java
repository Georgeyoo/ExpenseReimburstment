package com.george.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.george.model.Employee;
import com.george.util.AWSConnection;

public class EmployeeDaoImpl implements EmployeeDao {

	@Override
	public Employee selectEmployeeByEmail(String email) {
		Employee emp = null;

		String sql = "SELECT * FROM employees WHERE email = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, email);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				emp = new Employee(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
						rs.getBoolean(6), rs.getString(7));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		if (emp == null) {
			return null;
		} else {
			return emp;
		}
	}

	@Override
	public Employee selectEmployeeById(int i) {
		Employee emp = null;

		String sql = "SELECT * FROM employees WHERE e_id = ?";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, i);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				emp = new Employee(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
						rs.getBoolean(6), rs.getString(7));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		if (emp == null) {
			return null;
		} else {
			return emp;
		}
	}

	@Override
	public boolean insertEmployee(Employee emp) {
		String sql = "INSERT INTO employees (f_name, l_name, email, password, is_fm) VALUES" + "(?, ?, ?, ?, ?)";

		try (Connection conn = AWSConnection.getConnection()) {

			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, emp.getFirstName());
			ps.setString(2, emp.getLastName());
			ps.setString(3, emp.getEmail());
			ps.setString(4, emp.getPassword());
			ps.setBoolean(5, false);

			ps.execute();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		if (emp instanceof Employee) {
			return true;
		} else {
			return false;
		}
	}

//	@Override
//	public boolean updateProfilePicture(Employee e, String img) {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	@Override
//	public boolean deleteUser(Employee e) {
//		// TODO Auto-generated method stub
//		return false;
//	}

}
