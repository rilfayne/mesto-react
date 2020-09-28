import React from 'react'

function ImagePopup ({ card, onClose }) {
    if (!card) { return null }
    else {
        return (
            <section className="popup popup_image popup_opened" onClick={ onClose }>
                <div className="popup__image-container">
                    <button className="popup__close transition" type="button" aria-label="Закрыть"
                            onClick={ onClose }/>
                    <figure className="popup__image-figure">
                        <img className="popup__image" src={ card.link } alt={ card.name }/>
                        <figcaption className="popup__image-name">{ card.name }</figcaption>
                    </figure>
                </div>
            </section>
        )
    }
}

export default ImagePopup