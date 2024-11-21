import React from "react";
import './Styles/ChatHelpPrompt.css';
import { Link } from "react-router-dom";

function ChatHelpPrompt({closeBubble}) {
    return (
        <>
            <h1>What would you like to do?</h1>
            <nav class="options-container">
                <Link onClick={closeBubble} to="/"> Home</Link>
                <Link onClick={closeBubble} to="/course-catalog">Course Catalog</Link>
                <Link onClick={closeBubble} to="/profile">My Profile</Link>
                <Link onClick={closeBubble} to="/advising"> Advising Help</Link>
                <Link onClick={closeBubble} to="/transfers">Transfers</Link>
                <Link onClick={closeBubble} to="/internships"> Internships</Link>
                <Link onClick={closeBubble} to="/settings"> Settings</Link>
            </nav>
        </>
    )
}

export default ChatHelpPrompt;