/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(args) {
    const employee = {
        firstName: args[0],
        familyName: args[1],
        title: args[2],
        payPerHour: args[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
}

function createEmployeeRecords(arrs) {
    const emps = [];
    for (let arr of arrs) {
        emps.push(createEmployeeRecord(arr));
    }
    return emps;
}

function createTimeInEvent(punchStr) {
    let punchArr = punchStr.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        date: punchArr[0],
        hour: parseInt(punchArr[1])
    })
    return this;
}

function createTimeOutEvent(punchStr) {
    const punchArr = punchStr.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        date: punchArr[0],
        hour: parseInt(punchArr[1])
    })
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIns = this.timeInEvents.filter(x => x.date === date);
    const timeOuts = this.timeOutEvents.filter(x => x.date === date);
    let timeOnDay = 0;
    for (let i = 0; i < timeIns.length; i++) {
        timeOnDay += (timeOuts[i].hour/100 - timeIns[i].hour/100);
    }
    return timeOnDay;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstNameString) {
    return srcArray.find(x => x.firstName === firstNameString);
}

function calculatePayroll(emps) {
    let totalPayroll = 0;
    for (let emp of emps) {
        totalPayroll += allWagesFor.call(emp);
    }
    return totalPayroll;
}