// Your code here
// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Function to create an array of employee records from nested arrays
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Function to add a time-in event to an employee record
  function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(time),
      date,
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  // Function to add a time-out event to an employee record
  function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(time),
      date,
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    return hoursWorked * payRate;
  }
  
  // Function to calculate pay owed for all dates
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  