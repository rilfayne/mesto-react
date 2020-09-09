import React from 'react'

function ImagePopup () {
    return (
        <section className="popup popup_image">
            <div className="popup__image-container">
                <button className="popup__close transition" type="button" aria-label="Закрыть" />
                <figure className="popup__image-figure">
                    <img className="popup__image" />
                    <figcaption className="popup__image-name" />
                </figure>
            </div>
        </section>
    )
}

export default ImagePopup