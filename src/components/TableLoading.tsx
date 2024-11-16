import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TableLoading = () => {
    return (
        <div className='p-4 flex flex-col gap-[10px]'>
            <div className='flex flex-row justify-between gap-[10px] py-2'>
                <div></div>
                <div className='flex flex-row gap-[10px]'>
                    <Skeleton width={300} baseColor='white' height={60} />
                    <Skeleton width={30} baseColor='white' height={60} />
                    <Skeleton width={300} baseColor='white' height={60} />
                </div>
            </div>
            <Skeleton baseColor='white' height={60} />
            <Skeleton baseColor='white' height={60} />
            <Skeleton baseColor='white' height={60} />
            <Skeleton baseColor='white' height={60} />

            <div className='flex flex-row justify-between w-full'>
                <Skeleton width={100} baseColor='white' height={60} />
                <Skeleton width={300} baseColor='white' height={60} />
            </div>
        </div>
    )
}

export default TableLoading