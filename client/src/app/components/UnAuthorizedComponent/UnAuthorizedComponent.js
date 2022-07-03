import React from "react";
import CustomCard from "../resusableComponent/customCard/customCard";

const UnAuthorizedComponent = () => {
    return (
        <CustomCard
        text={'Permission Denied'}
        bg={'danger'}
        />
    )
}
export default UnAuthorizedComponent