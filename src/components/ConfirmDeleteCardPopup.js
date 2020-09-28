import PopupWithForm from './PopupWithForm.js'
import React from 'react'

function ConfirmDeleteCardPopup({ isOpen, onClose, isLoading, onSubmitClick }) {

    function handleSubmit(e) {
        onSubmitClick()
    }

    return (
        <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={ isOpen } onClose={ onClose }>
            <button className="popup__button popup__button_type_delete" type="button" onClick={ handleSubmit }>
                { isLoading ? 'Загрузка...' : 'Да' }
            </button>
        </PopupWithForm>
    )
}

export default ConfirmDeleteCardPopup