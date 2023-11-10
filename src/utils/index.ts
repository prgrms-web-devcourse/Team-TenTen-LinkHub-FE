import { PROFILE_MSG } from '@/constants'
import { UserData } from '@/types'

export const cls = (...classnames: (string | boolean | undefined)[]) => {
  return classnames.join(' ')
}

export interface GetFollowCheckedProps {
  userData: UserData
  myId: number
}

export const getFollowChecked = ({
  userData,
  myId,
}: GetFollowCheckedProps): boolean => {
  if (userData.follower.find((user) => user.userId === myId)) {
    return true
  } else {
    return false
  }
}
