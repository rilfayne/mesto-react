import PopupWithForm from './PopupWithForm.js'
import React from 'react'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [ formValues, setFormValues ] = React.useState({
        name: "",
        link: ""
    })

    const [dirty, setDirty] = React.useState({
        name: false,
        link: false
    })

    // Стартовое состояние ошибок
    const [errors, setErrors] = React.useState({
        name: {
            required: true,
            minLength: true,
            maxLength: true
        },
        link: {
            required: true,
            isLink: true
        }
    })

    // Заполнение полей формы и очистка ошибок при открытии попапа
    React.useEffect(() => {
        setFormValues({
            name: "",
            link: ""
        })
        setDirty({
            name: false,
            link: false
        })
    }, [isOpen])

    // Условия валидации
    const validators = {
        name: {
            required: (value) => {
                return value === ""
            },
            maxLength: (value) => {
                return value.length > 30
            }
        },
        link: {
            required: (value) => {
                return value === ""
            },
            isLink: (value) => {
                return !/^(http|https):\/\/[^ "]+$/.test(value) && value !== ""
            }
        }
    }

    // Валидация
    React.useEffect(
        function validateInputs() {
            const { name, link } = formValues

            const nameValidationResult = Object.keys(validators.name)
                .map((errorKey) => {
                    const errorResult = validators.name[errorKey](name)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            const linkValidationResult = Object.keys(validators.link)
                .map((errorKey) => {
                    const errorResult = validators.link[errorKey](link)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            setErrors({
                name: nameValidationResult,
                link: linkValidationResult
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
        e.preventDefault()

        onAddPlace({
            name,
            link
            })
    }

    const { name, link } = formValues
    const isNameInvalid = Object.values(errors.name).some(Boolean)
    const isLinkInvalid = Object.values(errors.link).some(Boolean)
    const isSubmitDisabled = isNameInvalid || isLinkInvalid

    return(
        <PopupWithForm name="place" title="Новое место" isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit } >
            <>
                <label className="popup__form-field">
                    <input onChange={ handleInputChange } value={ name } className="popup__input" type="text" name="name"
                           placeholder="Название" />
                    {dirty.name && errors.name.required && <span className="popup__input-error">Заполните это поле</span>}
                    {errors.name.maxLength && <span className="popup__input-error">Символов должно быть максимум 30</span>}
                </label>
                <label className="popup__form-field">
                    <input onChange={ handleInputChange } value={ link } className="popup__input" type="url" name="link"
                           placeholder="Ссылка на картинку" />
                    {dirty.link && errors.link.required && <span className="popup__input-error">Заполните это поле</span>}
                    {errors.link.isLink && <span className="popup__input-error">Введите URL-адрес</span>}
                </label>
                <button className="popup__button popup__button_type_place" type="submit" disabled={ isSubmitDisabled }>
                    { isLoading ? 'Загрузка...' : 'Создать' }
                </button>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup