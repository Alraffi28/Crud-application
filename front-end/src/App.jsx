import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios'

const API_URL = "https://crud-application-backend-q8kt.onrender.com/api";
function App() {
  const[data , setData] = useState([]);
  const[refresh , setRefresh] = useState(false);
  const[edit , setEdit] = useState("");
  const[box , setBox] = useState(false)
  const[error , setError] = useState("")
  const[form , setForm] = useState({
    name : '', subject : '',
    grade : ''
  })

  useEffect(()=> {
    // addUser(),
    getUser()
  },[refresh])

  function handleChange (e){
    setForm({...form , [e.target.name] : e.target.value})
  }
  async function addUser() {
    setError("")
    if(!form.name && !form.subject && !form.grade){
      setError("All fields are required")
      return;
    }
    if(!form.name){
      setError("Name is required")
      return;
    }
    if(!form.subject){
      setError("Subject is required")
      return;
    }
    if(!form.grade){
      setError("Grade is required")
      return;
    }
    try{
      const req = await axios.post(`${API_URL}/student` ,form)
      alert("New User Added")
      setRefresh(!refresh)
      setForm({name : "" , subject : "" , grade : ""})
    }
    catch(error){
      console.log(error);
    }
  }
  async function getUser(){
    const res = await axios.get(`${API_URL}/get`)
    setData(res.data.data)
  }
  function handleEdit(val){
    setForm({
      name : val.name,
      subject : val.subject,
      grade : val.grade
    })
    setEdit(val._id)
    setBox(!box)
  }
  async function editUser() {
    try{
      let res = await axios.put(`${API_URL}/edit/${edit}` , form)
      setForm({name : "" , subject : "" , grade : ""})
      setRefresh(!refresh)
      setBox(!box)
    }
    catch(err){
      console.log(err);
    }
  }
  async function deleteUser(id){
    const isConfirm = window.confirm("Do you want to delete this student record?")
    if(!isConfirm){
      return;
    }
    try{
      const res = await axios.delete(`${API_URL}/del/${id}`)
      setRefresh(!refresh)
    }catch(err){
      console.log(err);
    }
  }
  async function cancelBtn(){
    setRefresh(!refresh)
    setBox(!box)
    setForm({name : "" , subject : "" , grade : ""})
  }
  return (
    <>
    <div className="container">
      <h2>Students Record Management</h2>
      <div className="input-group">
        <input type="text" name='name' value={form.name} onChange={handleChange} placeholder=' Enter Your Name'/>
        <input type="text" name='subject' value={form.subject} onChange={handleChange} placeholder=' Enter Your subject'/>
        <input type="text" name='grade' value={form.grade} onChange={handleChange} placeholder=' Enter Your grade'/>
          <button className='add-btn' onClick={addUser}>Add</button>
      </div>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
    {/* {
        edit=== ""? <button onClick={()=>addUser()}>Add</button>
        : ""
      } */}
      <table>
        <thead>
        <tr>
        <th>Name</th>
        <th>Subject</th>
        <th>Grade</th>
        <th>action</th>
        </tr>
        </thead>

        <tbody>
      {
        data.map((val)=>{
          return( <tr key={val._id}>
            <td>{val.name}</td>
            <td>{val.subject}</td>
            <td>{val.grade}</td>
            <td>
              <button className='btn-edit' onClick={()=>handleEdit(val)}>Edit</button>
              <button className='btn-edit' onClick={()=>deleteUser(val._id)}>Delete</button>
            </td>
          </tr>
          )
        })
      }
      </tbody>
      </table>
      {
        box && (
          <div className="modal-overlay">
            <div className="edit-box">
            <h2>Edit Student Details</h2>
            <div className='input-group'>
              <input type="text" name='name' value={form.name} onChange={handleChange} placeholder=' Enter Your Name'/>
              <input type="text" name='subject' value={form.subject} onChange={handleChange} placeholder=' Enter Your subject'/>
              <input type="text" name='grade' value={form.grade} onChange={handleChange} placeholder=' Enter Your grade'/>
            </div>
            <div className='btns'>
              <button className='add-btn' onClick={() =>editUser()}>Edit</button>
              <button className='btn-cancel' onClick={()=>cancelBtn()}>Cancel</button>
            </div>  
          </div>
          </div>
        )
      }
      </div>
    </>
  )
}

export default App
