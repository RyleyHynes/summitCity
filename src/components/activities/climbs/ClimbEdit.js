import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export const ClimbEdit = () => {
    const [climb, editClimb] = useState({
        name: "",
        location: "",
        typeId: "",
        gradeId: "",
        description: ""
    })

    const { climbId } = useParams()
    const navigate = useNavigate()

    const [grades, setGrades] = useState([])
    const [types, setTypes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/climbs/${climbId}`)
            .then(response => response.json())
            .then((data) => {
                editClimb(data)
            })
    },
        [climbId]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/types`)
            .then((response) => response.json())
            .then((typeArray) => {
                setTypes(typeArray)
            })
    },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/grades`)
            .then((response) => response.json())
            .then((gradeArray) => {
                setGrades(gradeArray)
            })
    },
        []
    )

    const editButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/climbs/${climbId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(climb)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/climbs")
            })

    }

    return <>
        <form className="climbForm">
            <h2 className="climbForm__title">Update Climb</h2>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climb Name"
                        value={climb.name}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.name = event.target.value
                                editClimb(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group" key={climb.id}>
                    <label htmlFor="location">Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climb Location"
                        value={climb.location}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.location = event.target.value
                                editClimb(copy)
                            }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        value={climb.typeId}
                        onChange={(evt) => {
                            const copy = { ...climb }; //created a copy of existing state
                            copy.typeId = parseInt(evt.target.value) //to modify
                            editClimb(copy)
                        }}
                    >
                        <option value="0">Select Climbing Type</option>
                        {
                            types.map((type) => {
                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="grade">Grade:</label>
                    <select
                        value={climb.gradeId}
                        onChange={(evt) => {
                            const copy = { ...climb }; //created a copy of existing state
                            copy.gradeId = parseInt(evt.target.value) //to modify
                            editClimb(copy)
                        }}
                    >
                        <option value="0">Select Skill Level</option>
                        {
                            grades.map((grade) => {
                                return <option key={grade.id} value={grade.id}>{grade.level}</option>
                            })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climb Description"
                        value={climb.description}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.description = event.target.value
                                editClimb(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => editButtonClick(clickEvent)}
                className="edit-btn">
                Save
            </button>

            <button onClick={() => navigate("/climbs")}>Cancel</button>
        </form>
    </>

}
