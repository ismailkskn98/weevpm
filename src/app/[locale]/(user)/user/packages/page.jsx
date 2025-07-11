import HeaderTitle from '@/components/user/headerTitle'
import Packages from '@/components/user/packages'
import React from 'react'

export default function page() {
  return (
    <main className='w-full flex flex-col gap-8'>
      <HeaderTitle title='Paketler' description='Bu bölümde, paketleri görüntüleyebilir veya paketinizi güncelleyebilirsiniz.' />
      <Packages />
    </main>
  )
}
