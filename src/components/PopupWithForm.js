import React from 'react'

function PopupWithForm (props) {
    return (
        <section className={ props.isOpen ? `popup popup_${props.name} popup_opened` :  `popup popup_${props.name}`}>
            <div className="popup__container">
                <button className="popup__close transition" type="button" aria-label="Закрыть" />
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form popup__form_info" name={props.name} method="get" action="#" noValidate>
                    {props.children}
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm