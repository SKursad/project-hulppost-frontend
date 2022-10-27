import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import Screen from '../../../components/UI/Screen/Screen';
import Button from '../../../components/UI/Button/Button';
import './UploadImage.css';
import Input from '../../../components/Input/Input';


function ImageRequestPage() {
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const {id} = useParams();
    const token = localStorage.getItem("token");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleImageChange(e) {
        // Sla het gekozen bestand op
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setError(false);
        if (
            uploadedFile.type !== "image/jpeg" &&
            uploadedFile.type !== "image/png" &&
            uploadedFile.type !== "image/webp" &&
            uploadedFile.type !== "image/gif"
        ) {
            setError(true);
        } else
            setError(false);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e) {

        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`http://localhost:8080/hulppost/requests/${id}/image`, formData);

            navigate(`/request/${id}`);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Screen title="Afbeelding plaatsen" wide={true}>
            <form className="form-upload" onSubmit={sendImage}>
                <h4 className="form-upload__h4">Als u wilt kunt u een afbeelding plaatsen die past bij uw hulpvraag</h4>
                <div className="form-upload__page-container">
                    <label className="form-upload__image" htmlFor="request-image">
                        <p className="form-upload__p">Kies een afbeelding:</p>
                        <Input
                            type="file"
                            name="image-field"
                            id="Id"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            required={true}
                            onChange={handleImageChange}/>
                    </label>
                    {error && <strong className="error">ongeldige bestandstype </strong>}
                    {previewUrl && (
                        <label className="form-upload__label">
                            <img
                                className="form-upload__preview"
                                src={previewUrl}
                                alt="Voorbeeld afbeelding"
                            />
                        </label>
                    )}
                    <Button
                        type="submit"
                        disabled={error}>
                        UPLOADEN
                    </Button>
                    <Button
                        type="button"
                        onClick={() => navigate(`/request/${id}`)}>
                        ANNULEREN
                    </Button>
                </div>
            </form>
        </Screen>

    )
        ;
}

export default ImageRequestPage;