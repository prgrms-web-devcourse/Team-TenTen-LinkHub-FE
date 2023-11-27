import { useEffect, useMemo, useState } from 'react'
import { fetchSearchMySpaces } from '@/services/space/spaces'
import { fetchGetMyFavoriteSpaces } from '@/services/user/profile/favorites'
import { SearchMySpaceReqBody, SearchMySpaceResBody } from '@/types'

const useMySpace = (
  userId: number,
  spaceType: string,
  params: SearchMySpaceReqBody,
): SearchMySpaceResBody | undefined => {
  const [spaces, setSpaces] = useState<SearchMySpaceResBody>()
  const memoizedParams = useMemo(
    () => ({
      memberId: userId,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      filter: params.filter,
      keyWord: params.keyWord,
    }),
    [userId, params.filter, params.keyWord, params.pageNumber, params.pageSize],
  )

  useEffect(() => {
    const getMySpaces = async () => {
      try {
        if (userId) {
          const { responses } =
            spaceType === '내 스페이스'
              ? await fetchSearchMySpaces(memoizedParams)
              : await fetchGetMyFavoriteSpaces(memoizedParams)
          setSpaces(responses)
        }
      } catch (error) {
        alert('스페이스를 불러오지 못했습니다.')
      }
    }

    getMySpaces()
  }, [memoizedParams, spaceType, userId])

  return spaces
}

export { useMySpace }
