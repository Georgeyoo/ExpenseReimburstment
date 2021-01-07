package com.george.model;

import java.sql.Timestamp;
import java.util.Arrays;

public class Ticket {

	// Vars
	private int t_id;
	private int userId;
	private int departmentId;
	private int categoryId;
	private String name;
	private String desc;
	private byte[] image;
	private Timestamp dateSubmitted;
	private Timestamp dateStatus;
	private boolean isChecked;
	private boolean isRejected;
	private String department;
	private String category;
	private String email;
	private double amount;

	// Constructors
	public Ticket(int t_id, int userId, int departmentId, int categoryId, String name, String desc, byte[] image,
			Timestamp dateSubmitted, Timestamp dateStatus, boolean isChecked, boolean isRejected, String department,
			String category, String email, double amount) {
		super();
		this.t_id = t_id;
		this.userId = userId;
		this.departmentId = departmentId;
		this.categoryId = categoryId;
		this.name = name;
		this.desc = desc;
		this.image = image;
		this.dateSubmitted = dateSubmitted;
		this.dateStatus = dateStatus;
		this.isChecked = isChecked;
		this.isRejected = isRejected;
		this.department = department;
		this.category = category;
		this.email = email;
		this.amount = amount;
	}

	public Ticket() {
		super();
	}

	public int getT_id() {
		return t_id;
	}

	public void setT_id(int t_id) {
		this.t_id = t_id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Timestamp getDateSubmitted() {
		return dateSubmitted;
	}

	public void setDateSubmitted(Timestamp dateSubmitted) {
		this.dateSubmitted = dateSubmitted;
	}

	public Timestamp getDateStatus() {
		return dateStatus;
	}

	public void setDateStatus(Timestamp dateStatus) {
		this.dateStatus = dateStatus;
	}

	public boolean getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(boolean isChecked) {
		this.isChecked = isChecked;
	}

	public boolean getIsRejected() {
		return isRejected;
	}

	public void setIsRejected(boolean isRejected) {
		this.isRejected = isRejected;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Ticket [t_id=" + t_id + ", userId=" + userId + ", departmentId=" + departmentId + ", categoryId="
				+ categoryId + ", name=" + name + ", desc=" + desc + ", image=" + Arrays.toString(image)
				+ ", dateSubmitted=" + dateSubmitted + ", dateStatus=" + dateStatus + ", isChecked=" + isChecked
				+ ", isRejected=" + isRejected + ", department=" + department + ", category=" + category + ", email="
				+ email + ", amount=" + amount + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(amount);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + categoryId;
		result = prime * result + ((dateStatus == null) ? 0 : dateStatus.hashCode());
		result = prime * result + ((dateSubmitted == null) ? 0 : dateSubmitted.hashCode());
		result = prime * result + ((department == null) ? 0 : department.hashCode());
		result = prime * result + departmentId;
		result = prime * result + ((desc == null) ? 0 : desc.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + Arrays.hashCode(image);
		result = prime * result + (isChecked ? 1231 : 1237);
		result = prime * result + (isRejected ? 1231 : 1237);
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + t_id;
		result = prime * result + userId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ticket other = (Ticket) obj;
		if (Double.doubleToLongBits(amount) != Double.doubleToLongBits(other.amount))
			return false;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (categoryId != other.categoryId)
			return false;
		if (dateStatus == null) {
			if (other.dateStatus != null)
				return false;
		} else if (!dateStatus.equals(other.dateStatus))
			return false;
		if (dateSubmitted == null) {
			if (other.dateSubmitted != null)
				return false;
		} else if (!dateSubmitted.equals(other.dateSubmitted))
			return false;
		if (department == null) {
			if (other.department != null)
				return false;
		} else if (!department.equals(other.department))
			return false;
		if (departmentId != other.departmentId)
			return false;
		if (desc == null) {
			if (other.desc != null)
				return false;
		} else if (!desc.equals(other.desc))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (!Arrays.equals(image, other.image))
			return false;
		if (isChecked != other.isChecked)
			return false;
		if (isRejected != other.isRejected)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (t_id != other.t_id)
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

}
