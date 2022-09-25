import Part from './part';

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

export default Content;
