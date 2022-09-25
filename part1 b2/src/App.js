import Content from './components/content';
import Header from './components/header';
import Total from './components/total';

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
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
