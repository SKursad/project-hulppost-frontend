import React from 'react';
import defaultPicture from '../../assets/defaultProfilePic.png'

const ProfileWithDefaultImage = props => {
    const { image, tempImage } = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'http://localhost:8080/images/profile/' + image;
    }
    return (
        <img
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