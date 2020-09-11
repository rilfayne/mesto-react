import React from 'react'
import api from '../utils/api.js'
import Card from './Card.js'

function Main (props) {

    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])

    // Загрузка данных пользователя с сервера
    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name)
                setUserDescription(data.about)
                setUserAvatar(data.avatar)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }, [])

    // Загрузка карточек с сервера
    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards([...cards])
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }, [])

    return (
        <main>
            <section className="profile indent">
                <div className="profile__user">
                    <div className="profile__avatar transition" style={{ backgroundImage: `url(${userAvatar})` }}>
                        <button className="profile__edit-avatar-button" onClick={ props.onEditAvatar }/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button transition" type="button" aria-label="Редактировать" onClick={ props.onEditProfile } />
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button transition" type="button" aria-label="Добавить фото" onClick={ props.onAddPlace } />
            </section>
            <section className="places indent">
                <ul className="places__list">
                    {cards.map((card) => (
                            <Card key={card._id} card={card} onCardClick={ props.onCardClick }/>
                        )
                    )}
                </ul>
            </section>
        </main>
    )

}

export default Main