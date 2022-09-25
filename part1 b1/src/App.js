const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  const { parts } = props;
  console.log('content component', parts);
  Object.values(props).map((x, index) =>
    console.log('props map in content', x[index].pname)
  );

  return (
    <div>
      <h1>Courses:</h1>
      <h3>
        <Part parts={parts} />
      </h3>
    </div>
  );
};

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

const Total = ({ parts }) => {
  let res = Number(0);
  console.log('total component', parts);

  const destruct = parts.map((item) => {
    const { pname, exercises } = item;
    console.log('total pname', pname);
    console.log('total exercises', exercises);
    return pname;
  });

  const sum = parts.map((course) => {
    console.log('total exe', course.exercises);
    res += parseFloat(course.exercises);
    console.log('res', res);
    return res;
  });

  return (
    <div>
      <h1>Total: {res} exercises</h1>
    </div>
  );
};

function App() {
  const course = 'Half Stack application development';
  const parts = [
    { pname: 'Fundamentals of React', exercises: 10 },
    { pname: 'Using props to pass data', exercises: 7 },
    { pname: 'State of a component', exercises: 14 },
  ];
  parts.map((x) => console.log('content', x.pname));
  return (
    <div>
      <Header course={course} />
      <Content
        parts={parts}
        // part1={parts[0].name}
        // part2={parts[1].name}
        // part3={parts[2].name}
      />
      <Total
        parts={parts}
        // ex1={parts[0].exercises}
        // ex2={parts[1].exercises}
        // ex3={parts[2].exercises}
      />
    </div>
  );
}

export default App;
