import "./table.scss"

export function Table() {
    return (<table>
        <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Need/Want</th>
            <th>Price</th>
        </tr>
        <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
        </tr>
        <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
        </tr>
    </table>);
}