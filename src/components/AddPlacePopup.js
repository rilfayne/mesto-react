import PopupWithForm from './PopupWithForm.js'
import React from 'react'

function AddPlacePopup(props) {

    const nameRef = React.useRef("")
    const linkRef = React.useRef("")

    function handleSubmit(e) {
        e.preventDefault()

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
            })
    }

    return(
        <PopupWithForm name="place" title="Новое место" isOpen={ props.isOpen } onClose={ props.onClose } onSubmit={ handleSubmit } >
            <>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_place-name" id="place-name-input" type="text" name="name"
                           placeholder="Название" minLength="1" maxLength="30" required ref={ nameRef } />
                    <span className="popup__input-error" id="place-name-input-error" />
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_link" id="link-input" type="url" name="link"
                           placeholder="Ссылка на картинку" required ref={ linkRef } />
                    <span className="popup__input-error" id="link-input-error" />
                </label>
                <button className="popup__button popup__button_type_place" type="submit">Создать</button>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup