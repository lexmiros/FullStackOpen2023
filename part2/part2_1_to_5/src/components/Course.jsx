const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
      }, 0)

    return(
        <>
        <h1>{course.name}</h1>
        {course.parts.map(part => 
            <p key={part.id}>{part.name} {part.exercises}</p>
        )}
        <p><strong>Total of {totalExercises} exercises</strong></p>
        </>
    )
}

export default Course;