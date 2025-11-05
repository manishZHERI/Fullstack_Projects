function TeacherCard({ teacher }) {
    return (
    <div className="card">
    <h3>Teacher</h3>
    <p>Name: {teacher.name}</p>
    <p>Age: {teacher.age}</p>
    <p>Subject: {teacher.subject}</p>
    <p>Salary: ₹{teacher.salary}</p>
    </div>
    );
    }
export default TeacherCard;