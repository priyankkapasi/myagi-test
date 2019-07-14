const fs = require('fs');
const Employee = require('./Employee');



//Read employee data from provided file.
const employeeObjects = readEmployeeDataFromFile('random_names.txt');

//Create employee hierarchy tree.
const employeeHierarchyTree = createEmployeeHierarchyTree(employeeObjects);

//Print employee hierarchy tree to console.
printEmployeeHierarchy(employeeHierarchyTree, 0);




//Read employee details from file and create Employee objects.
function readEmployeeDataFromFile(fileName){
    const content = fs.readFileSync(fileName, "utf8");

    const employeeObjects = content.split('\r\n').map(employee => {
        const column = employee.split('\t');
        return new Employee(column[0], column[1], column[2], column[3]);
    });

    return employeeObjects;
}

//Create Employee lookup table based on Employee ID.
function createEmployeeIndexTable(employees){
    let employeeHashTable = [];

    for(let i=0; i < (employees.length - 1); i++){
        employeeHashTable[employees[i].getId()] = employees[i];
    }

    return employeeHashTable;
}

//Create employee hierarchy tree.
function createEmployeeHierarchyTree(employees) {

    let employeeTree =[];
    let employeeIndexTable = createEmployeeIndexTable(employees);

    for(let i=0; i < (employees.length - 1); i++){
        //If manager id is not present, it is a boss. Add as tree root.
        //else it is an employee / manager, add the employee as a child of that manager.
        if(!employees[i].getManagerEmployeeId()){
            employeeTree.push(employeeIndexTable[employees[i].getId()]);
        }else{
            employeeIndexTable[employees[i].getManagerEmployeeId()].addChild(employees[i]);
        }
    }
    return employeeTree;
}

//Create tab string to reflect employee depth im the tree.
function tab(depth){
    let tab="";
    for(let i=0;i<depth;i++){
        tab += "\t";
    }
    return tab;
}

//Traverse the employee tree object and print hierarchy to console.
function printEmployeeHierarchy(tree, depth){
    for(let i=0; i < tree.length; i++){
        
        //print the employee description to console.
        console.log(`${tab(depth)}${depth} - ${tree[i].getDescription()}`);

        //If employee has children, traverse the children tree.
        if(tree[i].getChildren().length > 0){
            printEmployeeHierarchy(tree[i].getChildren(), depth+1);
        }
    }
}