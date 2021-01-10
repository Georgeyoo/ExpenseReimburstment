package com.george.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.george.dao.EmployeeDao;
import com.george.dao.EmployeeDaoImpl;
import com.george.dao.TicketDao;
import com.george.dao.TicketDaoImpl;
import com.george.model.Employee;
import com.george.model.Ticket;
import com.george.service.Service;

public class ServicesTests {

	public static Ticket testTicket = new Ticket();
	public static Employee testEmployee = new Employee();

	@InjectMocks
	private Service testService = new Service();

	@Mock
	private static TicketDao tDao = new TicketDaoImpl();

	@Mock
	private static EmployeeDao eDao = new EmployeeDaoImpl();

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);

		// Sets Test Ticket Object Data
		testTicket.setT_id(1);
		testTicket.setUserId(1);
		testTicket.setDepartmentId(1);
		testTicket.setCategoryId(1);
		testTicket.setName("testTicket");
		testTicket.setDesc("This is a test ticket");
		testTicket.setImage(null);
		testTicket.setDateSubmitted(null);
		testTicket.setDateStatus(null);
		testTicket.setIsChecked(false);
		testTicket.setIsRejected(false);
		testTicket.setDepartment("Accounting & Finance");
		testTicket.setCategory("Commute & Parking");
		testTicket.setEmail("t@t.com");
		testTicket.setAmount(99.99);

		// Sets Test Employee Object Data
		testEmployee.setEmail("m@m.com");
		testEmployee.setFirstName("Margy");
		testEmployee.setLastName("Lopez");
		testEmployee.setIsFM(true);
		testEmployee.setPassword("password123");
		testEmployee.setProfileImage(null);

	}

	@Test
	public final void getTicketByIdTest() {

		List<Ticket> testList = new ArrayList<Ticket>();
		testList.add(testTicket);
		when(tDao.selectTicketById(anyInt())).thenReturn(testList);
		List<Ticket> ticketResult = testService.getTicketByUserId(17);

		assertNotNull(ticketResult);
		assertEquals("admin1", ticketResult.get(0).getName());
	}

	@Test
	public final void getTicketByUserEmail() {
		List<Ticket> testList = new ArrayList<Ticket>(); // Stub creation
		testList.add(testTicket); // Setting data of our Stub
		when(tDao.selectTicketByEmail(anyString())).thenReturn(testList);
		List<Ticket> ticketResult = testService.getTicketByUserEmail("m@m.com");

		assertNotNull(ticketResult);
		assertEquals("admin1", ticketResult.get(0).getName());
	}

	@Test
	public final void insertTicketTest() {
		when(tDao.insertTicket(testTicket)).thenReturn(true);
		assertTrue(testService.postTicket(testTicket));
	}

	@Test
	public final void getUserByEmail() {
		Employee testEmployee = new Employee(); // Stub creation
		when(eDao.selectEmployeeByEmail(anyString())).thenReturn(testEmployee);
		Employee employeeResult = testService.getUserByEmail("m@m.com");

		assertNotNull(employeeResult);
		assertEquals("Margy", employeeResult.getFirstName());
	}

	@Test
	public final void getUserById() {
		Employee testEmployee = new Employee(); // Stub creation
		when(eDao.selectEmployeeById(anyInt())).thenReturn(testEmployee);
		Employee employeeResult = testService.getUserById(17);

		assertNotNull(employeeResult);
		assertEquals("Margy", employeeResult.getFirstName());
	}

	@Test
	public final void insertEmployeeTest() {
		when(eDao.insertEmployee(testEmployee)).thenReturn(true);
		assertTrue(testService.registerUser(testEmployee));
	}

	@Test
	public final void getTicketNotByUserIdTest() {

		List<Ticket> testList = new ArrayList<Ticket>();
		testList.add(testTicket);
		when(tDao.selectAllTicketsNotByCurrentFM(anyInt())).thenReturn(testList);
		List<Ticket> ticketResult = testService.getTicketNotByUserId(1);

		assertNotNull(ticketResult);
		assertEquals("m@m.com", ticketResult.get(0).getEmail());
	}

}
