"use strict";

class Employee{

    constructor(employeeId, firstName, lastName, managerEmployeeId){
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.managerEmployeeId = managerEmployeeId;
        this.children = [];
    }

    addChild(employee){
        this.children.push(employee);
    }

    getId(){
        return this.employeeId;
    }

    getManagerEmployeeId(){
        return this.managerEmployeeId;
    }

    getChildren(){
        return this.children;
    }

    getDescription(){
        return `[${this.employeeId}] ${this.firstName} ${this.lastName} - Reports to [${this.managerEmployeeId}]`;
    }
    
}

module.exports = Employee;