package com.george.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AWSConnection {

//	static Dotenv dotenv = Dotenv.load();
//
//	private static final String URL = dotenv.get("DB_URL");
//	private static final String USERNAME = dotenv.get("DB_USERNAME");
//	private static final String PASSWORD = dotenv.get("DB_PASSWORD");
	private static final String URL = "jdbc:postgresql://erd.cbxp0cu6jyua.us-east-2.rds.amazonaws.com/postgres";
	private static final String USERNAME = "postgres";
	private static final String PASSWORD = "Star1!510144";

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
