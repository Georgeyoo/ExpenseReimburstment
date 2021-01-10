package com.george.utils;

import java.sql.Connection;
import java.sql.Statement;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.george.util.AWSConnection;

public class AWSConnectionTest {

	@InjectMocks
	private AWSConnection awsConnection;
	@Mock
	private Connection mockConnection;
	@Mock
	private Statement mockStatement;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testMockAWSConnection() throws Exception {
		Mockito.when(mockConnection.createStatement()).thenReturn(mockStatement);
//		Mockito.when(mockConnection.createStatement().executeUpdate(Mockito.any())).thenReturn(1);

	}

}
