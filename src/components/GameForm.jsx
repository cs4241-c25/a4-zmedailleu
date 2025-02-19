import React, {useState} from 'react';
import axios from 'axios';

function GameForm() {
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('');
    const [startDate, setStartDate] = useState('2025-01-01');
    const [completionDate, setCompletionDate] = useState('2025-01-31');
    const [rating, setRating] = useState('');
    const currentUser = window.localStorage.getItem("currentUser");

    const handleSubmit = (e) => {
        e.preventDefault();
        const object = {name: name, platform: platform, startdate: startDate, completiondate: completionDate, rating: rating, user: currentUser};
        axios.post("/submit", object);
    };

    const handlePlatform = (e) => {
        setPlatform(e.target.value);
    }

    return (
        <div className="d-flex flex-column align-items-center col-md-5">
            <h2>Enter Game Information Here</h2>
            <form id="gameform" onSubmit={handleSubmit}>
                <label htmlFor="gamename">Name: </label><br/>
                <input type="text" id="gamename" name="name" placeholder="Enter game here" value={name} onChange={(e) => setName(e.target.value)}/><br/><br/>

                <label>Platform</label><br/>
                <input type="radio" id="ps4" name="platform" value="PS4" checked={platform === "PS4"} onChange={handlePlatform}/>
                <label htmlFor="ps4">PS4</label><br/>
                <input type="radio" id="ps5" name="platform" value="PS5" checked={platform === "PS5"} onChange={handlePlatform}/>
                <label htmlFor="ps5">PS5</label><br/>
                <input type="radio" id="xboxone" name="platform" value="XBox One" checked={platform === "XBox One"} onChange={handlePlatform}/>
                <label htmlFor="xboxone">XBox One</label><br/>
                <input type="radio" id="seriesx" name="platform" value="XBox Series X" checked={platform === "XBox Series X"} onChange={handlePlatform}/>
                <label htmlFor="seriesx">XBox Series X</label><br/>
                <input type="radio" id="switch" name="platform" value="Nintendo Switch" checked={platform === "Nintendo Switch"} onChange={handlePlatform}/>
                <label htmlFor="switch">Nintendo Switch</label><br/>
                <input type="radio" id="pc" name="platform" value="PC" checked={platform === "PC"} onChange={handlePlatform}/>
                <label htmlFor="pc">PC</label><br/>
                <input type="radio" id="other" name="platform" value="Other" checked={platform === "Other"} onChange={handlePlatform}/>
                <label htmlFor="other">Other</label><br/><br/>

                <label htmlFor="gamestartdate">Date Started: </label><br/>
                <input type="date" id="gamestartdate" name="startdate" value={startDate} min="2010-01-02"
                       max="2030-12-31" onChange={(e) => setStartDate(e.target.value)}/><br/><br/>

                <label htmlFor="gameenddate">Date of Completion: </label><br/>
                <input type="date" id="gameenddate" name="completiondate" value={completionDate} min="2010-01-02"
                       max="2030-12-31" onChange={(e) => setCompletionDate(e.target.value)}/><br/><br/>

                <label htmlFor="rating">Rating out of 10</label><br/>
                <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="1/10">1/10</option>
                    <option value="2/10">2/10</option>
                    <option value="3/10">3/10</option>
                    <option value="4/10">4/10</option>
                    <option value="5/10">5/10</option>
                    <option value="6/10">6/10</option>
                    <option value="7/10">7/10</option>
                    <option value="8/10">8/10</option>
                    <option value="9/10">9/10</option>
                    <option value="10/10">10/10</option>

                </select><br/><br/>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default GameForm
