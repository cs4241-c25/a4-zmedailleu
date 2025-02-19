import React, {useEffect, useState} from 'react';
import axios from 'axios';

function GameTable() {
    //TEST DELETE LATER
    //window.localStorage.setItem("currentUser", "Kramer");
    const currentUser = window.localStorage.getItem("currentUser");
    const [games, setGames] = useState([]);
    const [editedRowID, setEditedRowID] = useState(null);
    const [editedRow, setEditedRow] = useState({});

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/getdata?user=${currentUser}`);
            setGames(response.data);
        }
        getData();
    });

    function modifyRow(row) {
        setEditedRowID(row._id);
        setEditedRow(row);
    }

    const handleInputChange = (e, key) => {
        setEditedRow(row => ({
            ...row, [key]:e.target.value
        }));
    }


    async function saveChanges(row) {
        await axios.put(`/modify`, editedRow);
        setEditedRowID(null);
    }


    return (
        <div className="d-flex flex-column align-items-center col-md-7">
            <h2>Games Entered</h2>

            <table id="gametable" className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Platform</th>
                    <th>Date Started</th>
                    <th>Date of Completion</th>
                    <th>Rating</th>
                    <th>Days Played</th>
                    <th>Modify</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody id="tabledata">
                {games.map((row) => (
                    <tr key={row._id}>
                        {editedRowID === row._id ?
                            (
                                <>
                                    <td><input type="text" value={editedRow.name} onChange={(e) => handleInputChange(e, "name")}/></td>
                                    <td><input type="text" value={editedRow.platform} onChange={(e) => handleInputChange(e, "platform")}/></td>
                                    <td><input type="date" value={editedRow.startdate} onChange={(e) => handleInputChange(e, "startdate")}/></td>
                                    <td><input type="date" value={editedRow.completiondate} onChange={(e) => handleInputChange(e, "completiondate")}/></td>
                                    <td><input type="text" value={editedRow.rating} onChange={(e) => handleInputChange(e, "rating")}/></td>
                                    <td>
                                        <button onClick={() => saveChanges(row)}>Save</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{row.name}</td>
                                    <td>{row.platform}</td>
                                    <td>{row.startdate}</td>
                                    <td>{row.completiondate}</td>
                                    <td>{row.rating}</td>
                                    <td>{calculateDaysPlayed(row.startdate, row.completiondate)}</td>
                                    <td>
                                        <button onClick={() => modifyRow(row)}>Modify</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteRow(row._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )

}

async function deleteRow(id) {
    await axios.post(`/delete/${id}`);
}

function calculateDaysPlayed(startDate, completionDate) {
    const startdate = Date.parse(startDate);
    const completiondate = Date.parse(completionDate);
    const daysplayed = (completiondate - startdate) / 86400000;

    return (daysplayed).toString();
}


export default GameTable
