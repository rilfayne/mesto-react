import PopupWithForm from './PopupWithForm.js'
import React from 'react'

function EditAvatarPopup(props) {

    const linkRef = React.useRef("")

    function handleSubmit(e) {
        e.preventDefault()

        props.onUpdateAvatar({
            avatar: linkRef.current.value,
        })
    }

    return(
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={ props.isOpen } onClose={ props.onClose } onSubmit={ handleSubmit }>
            <>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_avatar" id="avatar-link-input" type="url" name="avatar"
                           placeholder="Ссылка на аватар" required ref={ linkRef } />
                    <span className="popup__input-error" id="avatar-link-input-error" />
                </label>
                <button className="popup__button popup__button_type_avatar" type="submit">Сохранить</button>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup