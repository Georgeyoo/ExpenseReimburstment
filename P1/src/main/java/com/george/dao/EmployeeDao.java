package com.george.dao;

import java.util.List;

import com.george.model.Employee;

public interface EmployeeDao {

	// Get all users
	public List<Employee> selectAllEmployees();

	// Get User by Email (Authentication)
	public Employee selectEmployeeByEmail(String email);

	// Get user by ID
	public Employee selectEmployeeById(int i);

	// Create new Users
	public boolean insertEmployee(Employee e);

	// Update User information (start with profile picture)
	public boolean updateProfilePicture(Employee e, String img);

	// Delete User by ID
	public boolean deleteUser(Employee e);

}
