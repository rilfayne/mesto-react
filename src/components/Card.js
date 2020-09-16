import React from 'react'

function Card ({ card, onCardClick }) {
    return (
        <li className="place">
            <img className="place__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="place__description">
                <h2 className="place__name">{card.name}</h2>
                <div className="place__likes-container">
                    <button className="place__button-like transition" type="button" aria-label="Нравится" />
                    <p className="place__likes">{card.likes.length > 0 ? card.likes.length : ''}</p>
                </div>
            </div>
        </li>
    )

    function handleClick() {
        onCardClick(card)
    }
}

export default Card