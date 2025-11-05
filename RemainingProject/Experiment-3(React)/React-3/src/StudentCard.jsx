function StudentCard({ student }) {
    return (
    <div className="card">
    <h3>Student</h3>
    <p>Name: {student.name}</p>
    <p>Age: {student.age}</p>
    <p>Roll No: {student.rollNo}</p>
    <p>Course: {student.course}</p>
    </div>
    );
}
export default StudentCard;