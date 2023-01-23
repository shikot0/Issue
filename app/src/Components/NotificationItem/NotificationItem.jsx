import './NotificationItem.css';

function NotificationItem({notification}) {
    return (
        <article className={notification.seen ? 'notification-item' : 'notification-item unread'}>{notification.msg}</article>
    )
}

export default NotificationItem;