const StatisticLine = ({ text, value, um }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th width='200' style={{ textAlign: 'left' }}>
            {text}:
          </th>
          <td width='50' style={{ textAlign: 'left' }}>
            {value.toFixed(2)}
          </td>
          <td width='10' style={{ textAlign: 'left' }}>
            {um}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default StatisticLine
