import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})

    // Загрузка данных пользователя с сервера
    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }, [])

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
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleUpdateUser({ name, about }) {
        api.patchUserInfo(name, about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }

    function handleUpdateAvatar({ avatar }) {
        api.patchAvatar(avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
                console.log(res)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }


  return (
      <div className="page">
          <CurrentUserContext.Provider value={ currentUser }>
            <Header />
            <Main
                onEditProfile={ handleEditProfileClick }
                onEditAvatar={ handleEditAvatarClick }
                onAddPlace={ handleAddPlaceClick }
                onCardClick={ handleCardClick }
            />
              <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser } />
              <PopupWithForm name="place" title="Новое место" isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups }>
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
              </PopupWithForm>
              <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={ false } onClose={ closeAllPopups }>
                  <button className="popup__button popup__button_type_delete" type="button">Да</button>
              </PopupWithForm>
              <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar={ handleUpdateAvatar } />
              <ImagePopup card={ selectedCard } onClose={ closeAllPopups } />
            <Footer />
          </CurrentUserContext.Provider>
      </div>
  )

}

export default App
