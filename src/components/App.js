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
import AddPlacePopup from './AddPlacePopup.js'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])

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

    // Загрузка данных карточек с сервера
    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards([...res])
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id)

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                // Обновляем стейт
                setCards(newCards)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter(c =>
                    c !== card
                )
                setCards(newCards)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function closeAllPopups(e) {
        if(e.target.classList.contains('popup_opened') ||
        e.target.classList.contains('popup__close')) {
            setIsEditProfilePopupOpen(false)
            setIsEditAvatarPopupOpen(false)
            setIsAddPlacePopupOpen(false)
            setSelectedCard(null)
        }
            else { return false }
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

    function handleAddPlace({ name, link }) {
        api.postNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
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
                cards={ cards }
                onCardLike={ handleCardLike }
                onCardDelete={ handleCardDelete }
            />
              <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser } />
              <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } onAddPlace={ handleAddPlace } />
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
