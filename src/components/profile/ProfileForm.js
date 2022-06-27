import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { getUsers, saveUsersEdit } from "../../manager/APIManager"
import "./Profile.css"


// form to change employee state data. 
// when originally done, the specialty and rate fields were pre-filled with the values from the api.  because the property was bound to the input fields, react knows that the state values changed so it was rerendered automatically.
// fetch call is a put- which means replace, it has to be targeted directly, for the put operation to replace the values changed in the request. 
// for the put, we are passing thru the state variable of profile

export const ProfileForm = () => {

    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        name: "",
        email: ""
    })


    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)

    const [feedback, setFeedback] = useState("")
    // TODO: Get user profile info from API and update state
    useEffect(
        () => {
            getUsers(summitUserObject)
                .then((data) => {
                    const userObject = data[0]
                    updateProfile(userObject)
                })
        },
        []
    )


    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        saveUsersEdit(profile)
            .then(() => {
                setFeedback("User profile successfully saved")
            })

    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profileTitle">Update User Information</h2>
        <Avatar alt="Ryley Hynes" src={summitUserObject.url} sx={{width:200,height:200}} />
            <fieldset>
                <div className="form-group">
                    <label className="profileField" htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.name}
                        onChange={
                            (evt) => {
                                // TODO: Update name property
                                const copy = { ...profile }
                                copy.name = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="profile">
                    <label className="profileField" htmlFor="email">Email</label>
                    <input type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                // TODO: Update email property
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="saveProfile">
                Save Profile
            </button>
        </form>
    </>
    )

}