import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 1;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`Balance for ${this.name} : ${this.balance}`);
    }
    pay_fee(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }
    show_status() {
        chalk.greenBright.bold(console.log(`ID : ${this.id}`));
        chalk.greenBright.bold(console.log(`Name : ${this.name}`));
        chalk.greenBright.bold(console.log(`Courses : ${this.courses}`));
        chalk.greenBright.bold(console.log(`Balance : ${this.balance}`));
    }
}
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added successfully. student ID ${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`Student ${student.name} enrolled in course ${course}`);
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student not found. Please enter a correct Student ID`);
        }
    }
    pay_Student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log(`Student not found. Please enter a correct Student ID`);
        }
    }
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //method to find student by id
    find_student(student_id) {
        return this.students.find((student) => student.id === student_id);
    }
}
// main function to run the program
async function main() {
    console.log("Welcome to Student Management System");
    console.log("=".repeat(60));
    let manager = new student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Please select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        //Using switch case to handle the user's choice
        switch (choice.choices) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter the name of the student",
                    },
                ]);
                manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter the ID of the student",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter the name of the course",
                    },
                ]);
                manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter the ID of the student",
                    },
                ]);
                manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Student Fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter the ID of the student",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                manager.pay_Student_fees(fee_input.student_id, fee_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter the ID of the student",
                    },
                ]);
                chalk.greenBright.bold(manager.show_status(status_input.student_id));
                break;
            case "Exit":
                console.log(chalk.redBright.bold("Exiting the program......."));
                process.exit();
        }
    }
}
//calling a main function to run the program
main();
