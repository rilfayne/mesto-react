import React from 'react'

function Card (props) {
    return (
        <li className="place">
            <img className="place__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="place__description">
                <h2 className="place__name">{props.card.name}</h2>
                <div className="place__likes-container">
                    <button className="place__button-like transition" type="button" aria-label="Нравится" />
                    <p className="place__likes">{props.card.likes.length > 0 ? props.card.likes.length : ''}</p>
                </div>
            </div>
        </li>
    )

    function handleClick() {
        props.onCardClick(props.card)
    }
}

export default Card