import React from "react";

const CustomCard = ({text,bg}) => {
    return (
        <div className="container">
        <div className="vertical-center">
            <div className={`card px-3 text-${bg}`}>
                <h3>{text}</h3>
            </div>
        </div>
    </div>
    )
}

export default CustomCard