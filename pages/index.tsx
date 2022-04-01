import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from "../client";
import List from './components/List'

const Home: NextPage = () => {
  const [loading,setLoading] = useState(true)
  const [tasks,setTasks] = useState([])

  const [task, setTask] = useState({
    name: "",
    activity:"",
    startDate: "",
    endDate :""
  })

  const {name, activity, startDate, endDate} = task

  const getTasks = async ()=>{
    const {data} = await supabase.from("user").select();
    setTasks(data);
    setLoading(false)
  }

  useEffect(() => {
    getTasks()
  },[])

  const addTask = async () =>{
    setLoading(true)
    const {data, error } = await supabase.from("user").insert([{
      name,activity,startDate,endDate
    }],{ returning: "minimal" })

    setTask({
      name: "",
      activity:"",
      startDate: "",
      endDate :""
    })
    getTasks()
  }

  const deleteTask = async (id) =>{
    setLoading(true)
    await supabase.from("user").delete().eq("id",id);
    getTasks()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Supabase and Nextjs App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          <a className="text-blue-600" href="/">
            Supabase in NextJs
          </a>
        </h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
           <form className='bg-white rounded px-8 pt-6 pb-8 mb-4'>
             <div className='mb-4 text-center'>
               <label htmlFor="taskName" className='block text-gray-700 text-sm font-bold mb-2'>Task Name</label>
               <input placeholder='Task Name' 
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="taskName" type="text" 
                onChange={(e) => setTask({...task,name : e.target.value})}
                />
             </div>
             <div className='mb-4 text-center'>
               <label htmlFor="taskActivity" className='block text-gray-700 text-sm font-bold mb-2'>Task Activity</label>
               <input placeholder='Task Activity' 
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="taskActivity" 
                type="text"
                onChange={(e) => setTask({...task,activity : e.target.value})}
                />
             </div>
             <div className='mb-4 text-center'>
               <label htmlFor="taskName" className='block text-gray-700 text-sm font-bold mb-2'>Start Date</label>
               <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="startDate" type="date"
                onChange={(e) => setTask({...task,startDate : e.target.value})}
                 />
             </div>
             <div className='mb-4 text-center'>
               <label htmlFor="taskName" className='block text-gray-700 text-sm font-bold mb-2'>End Date</label>
               <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="endDate" type="date"
                onChange={(e) => setTask({...task,endDate : e.target.value})}
                 />
             </div>
             <div className='flex items-center'>
               <button className='bg-blue-500 px-4 py-2 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
               onClick={addTask}
               >
                 Add Task
               </button>
             </div>
           </form>
          </div>
          {loading ?
            <div className="flex justify-center items-center">
              <div className="animate-spin w-10 h-10 border-t-2 border-b-2 rounded-full border-blue-500">

              </div>
            </div>
            : <List deleteTask={deleteTask} tasks={tasks} />
          }
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by <span className='text-red-500 text-2xl'> &hearts; </span> <b>Manish Nandwani</b>
        </a>
      </footer>
    </div>
  )
}

export default Home