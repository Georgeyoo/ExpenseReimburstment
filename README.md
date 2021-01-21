# Expense Reimbursements Application

## Project Description

A Web Application built using Java Servelets, Apache Tomcat, and Bootstrap 4 which allows for the handling of expense reimbursements.

## Technologies Used

- Apache Tomcat 8.5.60
- UIKit
- Jackson Core (Object Mapper)
- Hibernate 4.3.11.Final
- Java Servlet API 3.1.0
- Log4j API 2.13.0
- PostgreSQL 42.2.18
- JUnit
- Mockito 1.8.4


## Features

List of features ready and TODOs for future development
- After registering or logging in, users can submit tickets specifying an amount, category, and department.
- Financial Managers can approve/deny a reimbursement request. To avoid fraudulant behavior Financial Managers are unable to approve/deny their own reimburstment requests. 

To-do list:
* Complete implementation of receipt (PDF/jpg/png) upload.
* Addition of email confirmation upon new user registration.

## Getting Started
   
In order to see this project in action, you will need a few things:

1) Be sure to have Apache Tomcat 8.5.60 installed.
2) Be sure to have the Java 8 runtime environment installed.

If both of the pre-requisites above are met, go ahead and clone this repo by using the below command:

        git clone https://github.com/Georgeyoo/ExpenseReimburstment.git

Once cloned, copy the .war file located within the /target directory and paste it into your tomcat webapps folder.

Once the .war has been exploded, by default you will be able to view the application at http://localhost:8080/p1/api/landing

## Usage

Welcome to Expens.ly!

![home](https://i.ibb.co/mywKjHh/exspensly.png)

To start, register a new user either at the bottom of the landing page (Call to Action) or by clicking "Login" then "Create a new account".

![register](diagram.png)

After registering we can proceed to logging in.

![login](diagram.png)

Upon logging in, users will be able to see historical reimburstment requests, sort requests, and/or create a new request.
![create-ticket](diagram.png)

Now that a ticket has been submitted, a Financial Manager will need to either approve/reject it. In the mean time, you'll notice that the reimburstment request now shows at the bottom. If reimburstment request history becomes too hectic, the you can always sort reimburstments to quickly find requests.

![sort-ticket](https://i.ibb.co/Qb5t8sH/sort.png)

## License

This project uses the following license: [<license_name>](<link>).

