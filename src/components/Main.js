import React from 'react'
import api from '../utils/api.js'
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main ({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {

    const [cards, setCards] = React.useState([])
    const currentUser = React.useContext(CurrentUserContext)

    // Загрузка данных пользователя с сервера
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

    return (
        <main>
            <section className="profile indent">
                <div className="profile__user">
                    <div className="profile__avatar transition" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                        <button className="profile__edit-avatar-button" onClick={ onEditAvatar }/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button transition" type="button" aria-label="Редактировать" onClick={ onEditProfile } />
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button transition" type="button" aria-label="Добавить фото" onClick={ onAddPlace } />
            </section>
            <section className="places indent">
                <ul className="places__list">
                    {cards.map((card) => (
                            <Card
                                key={ card._id }
                                card={ card }
                                onCardClick={ onCardClick }
                                onCardLike={ handleCardLike }
                                onCardDelete={ handleCardDelete } />
                        )
                    )}
                </ul>
            </section>
        </main>
    )

}

export default Main