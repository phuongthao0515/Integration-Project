import React, { useState } from "react";
import "./PlanInput.scss";

const PlanInput = ({ isOpen, onClose }) => {
    const [importance, setImportance] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="plan-input-overlay">
            <div className="plan-input-container">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>New Plan</h2>
                <div className="form-control">
                    <textarea placeholder="Content" required></textarea>
                </div>
                <div className="form-control">
                    <input type="date" required />
                </div>
                <div className="form-control">
                    <label htmlFor="importance-switch"></label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="importance-switch"
                            checked={importance}
                            onChange={(e) => setImportance(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                    <div className="importance-label">
                        {importance ? "Important" : "Not Important"}
                    </div>
                </div>
                <button className="submit-button">Save Plan</button>
            </div>
        </div>
    );
};

export default PlanInput;
