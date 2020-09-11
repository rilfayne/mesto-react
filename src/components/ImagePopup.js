import React from 'react'

function ImagePopup (props) {
    if (!props.card) { return null }
    else {
        return (
            <section className="popup popup_image popup_opened">
                <div className="popup__image-container">
                    <button className="popup__close transition" type="button" aria-label="Закрыть"
                            onClick={props.onClose}/>
                    <figure className="popup__image-figure">
                        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                        <figcaption className="popup__image-name">{props.card.name}</figcaption>
                    </figure>
                </div>
            </section>
        )
    }
}

export default ImagePopup