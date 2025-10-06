import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Mohammad Kaif", email: "kaif@example.com" },
    { id: 2, name: "Mubarak Ali", email: "mubarak@example.com" },
  ]);

   
  
const getUserData=async()=>{
  const user=await fetch("http://localhost:3000/api/v1/user",{
    method:"get",
    headers:{"content-type":"application/json"}
  })
  const data=await user.json()
  // alert(data.msg)
  console.log(data.getData)
  setUsers(data.getData)
}
useEffect(()=>{
  getUserData()
},[])
  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
          User Dashboard
        </h2>
      

      {/* User Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-center">Image</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u,i) => (
              <tr key={i} className="border-t">
                <td className="p-3 text-center flex justify-center">
  <img src={u.image} alt="user" width={100} />
</td>

                <td className="p-3 text-center">{u.name}</td>
                <td className="p-3 text-center">{u.email}</td>
                 
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;

 