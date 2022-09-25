// const Part = (props) => {
//   const { parts } = props;
//   console.log('part component', parts);

//   return parts.map((course, index) => (
//     <div key={index}>
//       <h3>{course.pname}</h3>
//     </div>
//   ));
// };

const Part = ({ parts }) => {
  console.log('part component', parts);

  return parts.map((course, index) => (
    <div key={index}>
      <p>
        {course.pname} - {course.exercises} exercises
      </p>
    </div>
  ));
};

export default Part;
