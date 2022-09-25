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

export default Total;
