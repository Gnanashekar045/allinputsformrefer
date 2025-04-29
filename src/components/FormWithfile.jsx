import React, { useEffect, useState } from "react";

const FormDataFile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        number: "",
        hobbies: [],
        file: ""
    });

    const [listUsers, setListUsers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => { fetchExistingusers() }, []);

    const fetchExistingusers = () => {
        const fetchExistingusersData = JSON.parse(localStorage.getItem("userData")) || [];
        setListUsers(fetchExistingusersData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox" && name === "hobbies") {
            setUser((prev) => {
                const updatedHobbies = checked
                    ? [...prev.hobbies, value]
                    : prev.hobbies.filter((hobby) => hobby !== value);
                return { ...prev, hobbies: updatedHobbies };
            });
        } else if (type === "file") {
            setUser((prev) => ({
                ...prev,
                file: files[0]?.name || ""
            }));
        } else {
            setUser((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingusers = JSON.parse(localStorage.getItem("userData")) || [];
        // const updateusers = [...exsitingusers, user]
        if (editIndex !== null) {
            existingusers[editIndex] = user;
        } else {
            existingusers.push(user);
        }

        localStorage.setItem("userData", JSON.stringify(existingusers)); //(updateusers)
        setListUsers(existingusers); // (updateusers)
        setEditIndex(null);
        setUser({
            name: "",
            email: "",
            number: "",
            hobbies: [],
            file: ""
        });
    };

    const deleteUser = (index) => {
        const updatedList = [...listUsers];
        updatedList.splice(index, 1);
        setListUsers(updatedList);
        localStorage.setItem("userData", JSON.stringify(updatedList));
    };

    const handleEdit = (index) => {
        setUser(listUsers[index]);
        setEditIndex(index);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} /><br />
                <label htmlFor="">Email</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} /><br />
                <label htmlFor="">Number</label>
                <input type="number" name="number" value={user.number} onChange={handleChange} /><br />
                <label htmlFor="">Hobbies</label>
                <input type="checkbox" name="hobbies" value="Reading" checked={user.hobbies.includes("Reading")} onChange={handleChange} />
                <input type="checkbox" name="hobbies" value="Playing" checked={user.hobbies.includes("Playing")} onChange={handleChange} />
                <input type="checkbox" name="hobbies" value="Swimming" checked={user.hobbies.includes("Swimming")} onChange={handleChange} /><br />
                <label htmlFor="">File</label>
                <input type="file" name="file" onChange={handleChange} /><br />
                <button type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Hobbies</th>
                        <th>File</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((usr, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{usr.name}</td>
                            <td>{usr.email}</td>
                            <td>{usr.number}</td>
                            <td>{usr.hobbies.join(", ")}</td>
                            <td>{usr.file}</td>
                            <td><button onClick={() => handleEdit(i)}>Edit</button></td>
                            <td><button onClick={() => deleteUser(i)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormDataFile;
