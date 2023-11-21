'use client'

import { useForm } from 'react-hook-form'
import { CategoryList, Input } from '@/components'
import Space from '@/components/common/Space/Space'
import { mock_userData2 } from '@/data'
import useSpaceSearch from '@/hooks/useSpaceSearch'

export interface SearchFormValue {
  keyWord: string
}

const UserSpacePage = () => {
  const spaceData = mock_userData2.mySpaces
  const { register, setValue, handleSubmit } = useForm<SearchFormValue>({
    defaultValues: {
      keyWord: '',
    },
  })
  const { handleCategoryChange, onSubmit } = useSpaceSearch({ setValue })

  return (
    <div className="px-4">
      <CategoryList
        type="all"
        horizontal={true}
        onChange={handleCategoryChange}
      />
      <form
        onSubmit={handleSubmit(({ keyWord }) => {
          onSubmit({ searchKeyWord: keyWord })
        })}>
        <Input
          {...register('keyWord')}
          inputButton={true}
          buttonText="검색"
          buttonColor="gray"
        />
      </form>
      <div className="flex flex-col gap-2 py-4">
        {spaceData.map((space) => (
          <Space
            key={space.spaceId}
            type="Card"
            userName={space.userName}
            spaceId={space.spaceId}
            spaceName={space.spaceName}
            spaceImage={space.spaceImage}
            description={space.description}
            category={space.category}
            scrap={space.scrap}
            favorite={space.favorite}
          />
        ))}
      </div>
    </div>
  )
}

export default UserSpacePage
