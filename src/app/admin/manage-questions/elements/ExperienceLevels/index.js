import LevelCard from '@/app/admin/manage-skills/elements/LevelCard';
import SkillCard from '@/app/admin/manage-skills/elements/LevelCard';
import useFullUrl from '@/hooks/useFullUrl';
import { experienceLevelsSelector } from '@/store/features/questions/selectors';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ExperienceLevels = () => {
    const fullUrl = useFullUrl()
    const [cards, setCards] = useState(['Intermediate(3-6)', 'Expert(6+)']);
    const router = useRouter()

    const experienceLevels = useSelector(experienceLevelsSelector)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 bg-primary-200 p-6'>
            {experienceLevels?.map((item, index) => (
                <div key={item?.id}>
                    <LevelCard
                        title={item?.title}
                        onEdit={() => handleOpenDialog(index)}  // Passing the edit handler
                        onDelete={() => handleOpenDeleteDialog(index)}  // Passing the delete handler
                        onClick={() => {
                            router.push(fullUrl + `&experience=${item?.id}`)
                        }}
                        hasActions={false}
                    />
                </div>
            ))}
        </div>
    )
}

export default ExperienceLevels