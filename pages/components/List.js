const List = ({ tasks,deleteTask }) =>{
    return (
      <div className='w-96 rounded-xl focus:text-blue-600'>
      <table className='shadow-lg bg-white'>
        <tbody>
          <tr>
            <th className="bg-blue-400 border text-left px-4 py-4">
              S/n
            </th>
            <th className="bg-blue-400 border text-left px-4 py-4">
              Name
            </th>
            <th className="bg-blue-400 border text-left px-4 py-4">
              Activity
            </th>
            <th className="bg-blue-400 border text-left px-4 py-4">
              Start Date
            </th>
            <th className="bg-blue-400 border text-left px-4 py-4">
              End Date
            </th>
            <th className="bg-blue-400 border text-left px-4 py-4">
              Action
            </th>
          </tr>
            {
              tasks.map(({id,name,activity,startDate,endDate},index)=>(
                <tr key={id}>
                  <td className='px-5 py-4 border'>{index+1}</td>
                  <td className='px-5 py-4 border'>{name}</td>
                  <td className='px-5 py-4 border'>{activity}</td>
                  <td className='px-5 py-4 border'>{startDate}</td>
                  <td className='px-5 py-4 border'>{endDate}</td>
                  <td className='px-5 py-4 border'>
                    <button onClick={() => deleteTask(id)} className='bg-red-500 hover:bg-red-700 rounded text-white font-bold px-4 py-2'> 
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </div>
    )
}

export default List