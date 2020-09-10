import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)

  return (
      <div className="page">
        <Header />
        <Main
            onEditProfile={ handleEditProfileClick }
            onEditAvatar={ handleEditAvatarClick }
            onAddPlace={ handleAddPlaceClick }
        />
          <PopupWithForm name="info" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
              <>
                  <label className="popup__form-field">
                      <input className="popup__input popup__input_name" id="name-input" type="text" name="name"
                             placeholder="Имя" minLength="2" maxLength="40" required />
                      <span className="popup__input-error" id="name-input-error" />
                  </label>
                  <label className="popup__form-field">
                      <input className="popup__input popup__input_description" id="description-input" type="text"
                             name="about" placeholder="О себе" minLength="2" maxLength="200" required />
                      <span className="popup__input-error" id="description-input-error" />
                  </label>
                  <button className="popup__button popup__button_type_info" type="submit">Сохранить</button>
              </>
          } />
          <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
              <>
                  <label className="popup__form-field">
                      <input className="popup__input popup__input_place-name" id="place-name-input" type="text" name="name"
                             placeholder="Название" minLength="1" maxLength="30" required />
                      <span className="popup__input-error" id="place-name-input-error" />
                  </label>
                  <label className="popup__form-field">
                      <input className="popup__input popup__input_link" id="link-input" type="url" name="link"
                             placeholder="Ссылка на картинку" required />
                      <span className="popup__input-error" id="link-input-error" />
                  </label>
                  <button className="popup__button popup__button_type_place" type="submit">Создать</button>
              </>
          } />
          <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={false} onClose={closeAllPopups} children={
              <button className="popup__button popup__button_type_delete" type="button">Да</button>
          } />
          <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
              <>
                  <label className="popup__form-field">
                      <input className="popup__input popup__input_avatar" id="avatar-link-input" type="url" name="avatar"
                             placeholder="Ссылка на аватар" required />
                      <span className="popup__input-error" id="avatar-link-input-error" />
                  </label>
                  <button className="popup__button popup__button_type_avatar" type="submit">Сохранить</button>
              </>
          } />
          <ImagePopup />
        <Footer />
      </div>
  )

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
    }
}

export default App
