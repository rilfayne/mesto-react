import React from 'react'

function Main (props) {
    return (
        <main>
            <section className="profile indent">
                <div className="profile__user">
                    <div className="profile__avatar transition">
                        <button className="profile__edit-avatar-button" onClick={ props.onEditAvatar }/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">Жак Ив Кусто</h1>
                            <button className="profile__edit-button transition" type="button" aria-label="Редактировать" onClick={ props.onEditProfile } />
                        </div>
                        <p className="profile__description">Исследователь океана</p>
                    </div>
                </div>
                <button className="profile__add-button transition" type="button" aria-label="Добавить фото" onClick={ props.onAddPlace } />
            </section>
            <section className="places indent">
                <ul className="places__list">
                </ul>
            </section>
        </main>
    )

}

export default Main