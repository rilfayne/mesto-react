import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup.js'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState(null)
    const [cards, setCards] = React.useState([])
    const [card, setCard] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)

    // Загрузка данных пользователя и карточек с сервера
    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
            ])
            .then((values) => {
                const [userData, initialCards] = values
                setCurrentUser(userData)
                setCards([...initialCards])
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
        setIsConfirmPopupOpen(true)
        setCard(card)
    }

    function handleConfirmDelete() {
        setLoading(true)
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter(c =>
                    c !== card
                )
                setCards(newCards)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
            .finally(() =>{
                setLoading(false)
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

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsConfirmPopupOpen(false)
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleUpdateUser({ name, about }) {
        setLoading(true)
        api.patchUserInfo(name, about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
            .finally(() =>{
                setLoading(false)
            })
    }

    function handleUpdateAvatar({ avatar }) {
        setLoading(true)
        api.patchAvatar(avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
            .finally(() =>{
                setLoading(false)
            })
    }

    function handleAddPlace({ name, link }) {
        setLoading(true)
        api.postNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
            .finally(() =>{
                setLoading(false)
            })
    }

    if (currentUser === null) { return false }
    else {
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
                    <EditProfilePopup
                        isOpen={ isEditProfilePopupOpen }
                        onClose={ closeAllPopups }
                        onUpdateUser={ handleUpdateUser }
                        isLoading={ isLoading }
                    />
                    <AddPlacePopup
                        isOpen={ isAddPlacePopupOpen }
                        onClose={ closeAllPopups }
                        onAddPlace={ handleAddPlace }
                        isLoading={ isLoading }
                    />
                    <EditAvatarPopup
                        isOpen={ isEditAvatarPopupOpen }
                        onClose={ closeAllPopups }
                        onUpdateAvatar={ handleUpdateAvatar }
                        isLoading={ isLoading }
                    />
                    <ImagePopup
                        card={ selectedCard }
                        onClose={ closeAllPopups }
                    />
                    <ConfirmDeleteCardPopup
                        isOpen={ isConfirmPopupOpen }
                        onClose={ closeAllPopups }
                        isLoading={ isLoading }
                        onSubmitClick={ handleConfirmDelete }
                    />
                    <Footer />
                </CurrentUserContext.Provider>
            </div>
        )
    }



}

export default App
