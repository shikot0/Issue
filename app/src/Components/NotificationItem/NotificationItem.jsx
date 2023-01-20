import './NotificationItem.css';

function NotificationItem({notification}) {
    return (
        <article className="notification-item">{notification.msg}</article>
    )
}

export default NotificationItem;