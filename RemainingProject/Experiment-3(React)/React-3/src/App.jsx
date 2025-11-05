import React from 'react';
import { Person } from './Person';
import StudentCard from './StudentCard';
import TeacherCard from './TeacherCard';
class Student extends Person {
constructor(name, age, rollNo, course) {
super(name, age);
this.rollNo = rollNo;
this.course = course;
}
}
class Teacher extends Person {
constructor(name, age, subject, salary) {
super(name, age);
this.subject = subject;
this.salary = salary;
}
}
function App() {
const people = [
new Student("Pratibha", 21, "CS001", "MERN Stack"),
new Teacher("Mr.Ritesh Kumar", 35, "Web Dev", 65000),
new Student("Kashish", 20, "CS002", "Data Science"),
new Teacher("Ms. Ankita Sharma", 28, "DBMS", 70000),
new Student("Meera Patel", 19, "CS102", "Cybersecurity"),
new Teacher("Mr. Rohit Mehra", 32, "Cloud Computing", 68000),
];
return (
<div className="container">
<h2>Person Hierarchy</h2>
<div className="grid">
{people.map((person, i) =>
person instanceof Student ? (
<StudentCard key={i} student={person} />
) : (
<TeacherCard key={i} teacher={person} />
)
)}
</div>
</div>
);
}
export default App;