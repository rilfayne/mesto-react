import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `place__button-delete transition ${isOwn ? 'place__button-delete_visible' : 'place__button-delete_hidden'}`
    )

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `place__button-like transition ${isLiked && 'place__button-like_active'}`
    )

    return (
        <li className="place">
            <img className="place__image" src={ card.link } alt={ card.name } onClick={ handleClick } />
            <button className={ cardDeleteButtonClassName } type="button" aria-label="Удалить" onClick={ handleDeleteClick } />
            <div className="place__description">
                <h2 className="place__name">{ card.name }</h2>
                <div className="place__likes-container">
                    <button className={ cardLikeButtonClassName } type="button" aria-label="Нравится" onClick={ handleLikeClick } />
                    <p className="place__likes">{ card.likes.length > 0 ? card.likes.length : '' }</p>
                </div>
            </div>
        </li>
    )
}

export default Card