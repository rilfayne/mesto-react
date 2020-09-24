import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import React from 'react'

function EditProfilePopup(props) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser])

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault()

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        })
    }

    return(
        <PopupWithForm name="info" title="Редактировать профиль" isOpen={ props.isOpen } onClose={ props.onClose } onSubmit={ handleSubmit } >
            <>
                <label className="popup__form-field">
                    <input onChange={ handleNameChange } value={ name || "" } className="popup__input popup__input_name" id="name-input" type="text" name="name"
                           placeholder="Имя" minLength="2" maxLength="40" required />
                    <span className="popup__input-error" id="name-input-error" />
                </label>
                <label className="popup__form-field">
                    <input onChange={ handleDescriptionChange } value={ description || "" } className="popup__input popup__input_description" id="description-input" type="text"
                           name="about" placeholder="О себе" minLength="2" maxLength="200" required />
                    <span className="popup__input-error" id="description-input-error" />
                </label>
                <button className="popup__button popup__button_type_info" type="submit">Сохранить</button>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup