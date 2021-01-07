package com.george.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AWSConnection {

	private static final String URL = "";
	private static final String USERNAME = "";
	private static final String PASSWORD = "";

	private static Connection conn;

	public static Connection getConnection() {

		try {

			Class.forName("org.postgresql.Driver");

			if (conn == null || conn.isClosed()) {
				conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);

			}

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return conn;
	}
}
