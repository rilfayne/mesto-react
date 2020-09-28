import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import React from 'react'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [ formValues, setFormValues ] = React.useState({
        name: "",
        about: ""
    })

    const [dirty, setDirty] = React.useState({
        name: false,
        about: false
    })

    // Стартовое состояние ошибок
    const [errors, setErrors] = React.useState({
        name: {
            required: true,
            minLength: true,
            maxLength: true
        },
        about: {
            required: true,
            minLength: true,
            maxLength: true
        }
    })

    const currentUser = React.useContext(CurrentUserContext)

    // Заполнение инпутов и очистка ошибок
    React.useEffect(() => {
        setFormValues(currentUser)
        setDirty({
            name: false,
            about: false
        })
    }, [currentUser, isOpen])

    // Условия валидации
    const validators = {
        name: {
            required: (value) => {
                return value === ""
            },
            minLength: (value) => {
                return value.length < 2 && value !== ""
            },
            maxLength: (value) => {
                return value.length > 40
            }
        },
        about: {
            required: (value) => {
                return value === ""
            },
            minLength: (value) => {
                return value.length < 2 && value !== ""
            },
            maxLength: (value) => {
                return value.length > 200
            }
        }
    }

    // Валидация
    React.useEffect(
        function validateInputs() {
            const { name, about } = formValues

            const nameValidationResult = Object.keys(validators.name)
                .map((errorKey) => {
                    const errorResult = validators.name[errorKey](name)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            const aboutValidationResult = Object.keys(validators.about)
                .map((errorKey) => {
                    const errorResult = validators.about[errorKey](about)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            setErrors({
                name: nameValidationResult,
                about: aboutValidationResult
            })
        },
        // eslint-disable-next-line
        [formValues, setErrors]
    )

    const handleInputChange = React.useCallback(
        (e) => {
            const { name, value } = e.target
            setFormValues((prevState) => ({ ...prevState, [name]: value }))
            setDirty((prevState) => ({...prevState, [name]: true}))
        },
        [setFormValues]
    )

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault()

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about,
        })
    }

    const { name, about } = formValues
    const isNameInvalid = Object.values(errors.name).some(Boolean)
    const isAboutInvalid = Object.values(errors.about).some(Boolean)
    const isSubmitDisabled = isNameInvalid || isAboutInvalid


    return(
        <PopupWithForm name="info" title="Редактировать профиль" isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit } >
            <>
                <label className="popup__form-field">
                    <input onChange={ handleInputChange } value={ name } className="popup__input" type="text" name="name"
                           placeholder="Имя" />
                    {dirty.name && errors.name.required && <span className="popup__input-error">Заполните это поле</span>}
                    {errors.name.minLength && <span className="popup__input-error">Символов должно быть минимум 2</span>}
                    {errors.name.maxLength && <span className="popup__input-error">Символов должно быть максимум 40</span>}
                </label>
                <label className="popup__form-field">
                    <input onChange={ handleInputChange } value={ about } className="popup__input" type="text"
                           name="about" placeholder="О себе" />
                    {dirty.about && errors.about.required && <span className="popup__input-error">Заполните это поле</span>}
                    {errors.about.minLength && <span className="popup__input-error">Символов должно быть минимум 2</span>}
                    {errors.about.maxLength && <span className="popup__input-error">Символов должно быть максимум 200</span>}
                </label>
                <button className="popup__button popup__button_type_info" type="submit" disabled={ isSubmitDisabled } >
                    { isLoading ? 'Загрузка...' : 'Сохранить' }
                </button>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup