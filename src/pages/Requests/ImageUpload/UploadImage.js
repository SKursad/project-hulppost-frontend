import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import DispatchContext from '../../../context/DispatchContext';
import api from '../../../api/api-calls';
import {getToken} from '../../../helper/AccesToken/GetToken';
import Screen from '../../../components/UI/Screen/Screen';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/Input/Input';
import {FaImages} from 'react-icons/fa';
import {MdCancel} from 'react-icons/md';
import './UploadImage.css';


function ImageRequestPage() {
    const {id} = useParams();
    const appDispatch = useContext(DispatchContext);
    const [file, setFile] = useState([]);
    const [error, setError] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
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
            let tokenConfig = getToken();
            delete tokenConfig.headers['Content-Type'];
            const response = await api.post(`/api/v1/requests/${id}/image`, formData, tokenConfig);
            appDispatch({type: "flashMessage", value: "Afbeelding succesvol geplaatst"});
            navigate(`/request/${id}`);
            console.log(response.data);
        } catch (e) {
            appDispatch({type: "flashMessage", value: "Er gaat iets mis"});
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
                            id="form-upload__id"
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
                        id="form-upload__submit"
                        type="submit"
                        disabled={error}>
                        UPLOADEN<FaImages/>
                    </Button>
                    <Button
                        id="form-upload__cancel"
                        type="button"
                        onClick={() => navigate(`/request/${id}`)}>
                        ANNULEREN<MdCancel/>
                    </Button>
                </div>
            </form>
        </Screen>

    );
}

export default ImageRequestPage;