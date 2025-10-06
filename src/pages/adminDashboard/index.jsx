import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CrudApp() {
  const [users, setUsers] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [id, setid] = useState();
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  const handleAdd = async () => {
    const user = await fetch("http://localhost:3000/api/v1/user", {
      method: "post",
      headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name, email }),
    });
    const data = await user.json();
    console.log(data);
    alert(data.msg);
    if (data.msg == "record saved") {
      setname("");
      setemail("");
      getUserData();
    }
    if(data.msg=="Invalid or expired token"){
navigate("/admin_login")
    }
    
  };
  const getUserData = async () => {

 
    const user = await fetch("http://localhost:3000/api/v1/user", {
      method: "get",
      headers: { "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await user.json();
    // alert(data.msg)
    console.log(data.getData);
    setUsers(data.getData);
     if(data.msg=="Invalid or expired token"){
navigate("/admin_login")
    }
  };
  const handleDelete = async (id) => {
    const deleteData = await fetch("http://localhost:3000/api/v1/user", {
      method: "delete",
      headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    const data = await deleteData.json();
    alert(data.msg);
    console.log(data.deleteData);
    if (data.msg == "user deleted successfully") {
      getUserData();
    }
     if(data.msg=="Invalid or expired token"){
navigate("/admin_login")
    }
  };
  const handleEdit = (m) => {
    console.log(m);
    setIsEditing(true);
    setname(m.name);
    setemail(m.email);
    setid(m._id);
     if(data.msg=="Invalid or expired token"){
navigate("/admin_login")
localStorage.removeItem("token")
    }
  };
  const handleUpdate = async () => {
    const updatedUser = await fetch("http://localhost:3000/api/v1/user", {
      method: "put",
      headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ id, name, email }),
    });
    const data = await updatedUser.json();
    alert(data.msg);
    console.log(data.updateData);
    if (data.msg == "update data successfully") {
      getUserData();
      setemail("");
      setname("");
      setIsEditing(false);
    }
     if(data.msg=="Invalid or expired token"){
navigate("/admin_login")
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3">
          Admin Dashboard
        </h2>
        <h1 className="text-2xl font-bold text-center mb-6">React CRUD App</h1>

        {/* Form */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="flex-1 border p-2 rounded-lg"
            required
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="flex-1 border p-2 rounded-lg"
            required
          />
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          )}
        </div>
        {/* <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button> */}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2 text-center">Name</th>
                <th className="border p-2 text-center">Email</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default CrudApp;
