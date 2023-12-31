'use client'

import { NONE_NOTIFICATION_RESULT } from '@/components/common/NotificationList/constants'
import { SEACH_MODAL_INFO } from '@/components/common/SearchModal/constants'

const NotificationPage = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* {notifications.map((notification) => (
        <Notification
          notificationId={notification.id}
          notificationType={notification.notificationType}
          userId={notification.userId}
          userName={notification.userName}
          spaceId={notification.spaceId}
          spaceName={notification.spaceName}
          isRead={notification.isRead}
          key={notification.id}
          onClose={() => console.log('알람 닫기')}
        />
      ))} */}
      <div className="py-5 text-center text-sm font-medium text-gray9">
        {SEACH_MODAL_INFO}
      </div>
    </div>
  )
}

export default NotificationPage
