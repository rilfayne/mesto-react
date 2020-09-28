import PopupWithForm from './PopupWithForm.js'
import React from 'react'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const [link, setLink] = React.useState("")

    const [dirty, setDirty] = React.useState(false)

    // Стартовое состояние ошибок
    const [errors, setErrors] = React.useState({
        link: {
            required: true,
            isLink: true,
        }
    })

    // Обнуление инпутов формы
    React.useEffect(() => {
        setLink("")
        setDirty(false)
    }, [isOpen])

    // Условия валидации
    const validators = {
        link: {
            required: (value) => {
                return value === ""
            },
            isLink: (url) => {
                return !/^(http|https):\/\/[^ "]+$/.test(url) && url !== ""
            }
        }
    }

    // Валидация
    React.useEffect(
        function validateInputs() {
            const linkValidationResult = Object.keys(validators.link)
                .map((errorKey) => {
                    const errorResult = validators.link[errorKey](link)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            setErrors({
                link: linkValidationResult,
            })
        },
        // eslint-disable-next-line
        [link, setErrors]
    )

    const handleInputChange = React.useCallback(
        (e) => {
            setLink(e.target.value)
            setDirty(true)
        },
        [setLink]
    )

    function handleSubmit(e) {
        e.preventDefault()

        onUpdateAvatar({
            avatar: link,
        })
    }

    const isSubmitDisabled = Object.values(errors.link).some(Boolean)

    return(
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit }>
            <>
                <label className="popup__form-field">
                    <input onChange={ handleInputChange } value={ link } className="popup__input" type="url" name="avatar" placeholder="Ссылка на аватар" />
                    {dirty && errors.link.required && <span className="popup__input-error">Заполните это поле</span>}
                    {errors.link.isLink && <span className="popup__input-error">Введите URL-адрес</span>}
                </label>
                <button className="popup__button popup__button_type_avatar" type="submit" disabled={ isSubmitDisabled }>
                    { isLoading ? 'Загрузка...' : 'Сохранить' }
                </button>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup