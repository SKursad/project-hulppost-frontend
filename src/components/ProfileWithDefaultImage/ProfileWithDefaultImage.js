import React from 'react';
import defaultPicture from '../../assets/defaultProfilePic.png'
import './ProfileWithDefaultPicture.css'

const ProfileWithDefaultImage = props => {
    const { image, tempImage } = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'http://localhost:8080/images/profile/' + image;
    }
    return (
        <img
            className={props.className || "defPicture"}
            alt={`Profile`}
            src={tempImage || imageSource}
            {...props}
            onError={event => {
                event.target.src = defaultPicture;
            }}
        />
    );
};

export default ProfileWithDefaultImage;