import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchIcon } from '@/public/sidebaricons/SearchIcon'
// imports for Schema and validation
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '@/components/tooltips/tooltip'

export default function ProductCategories() {
    const [query, setQuery] = useState('')

    return <>
        <div className="flex mt-[15px] justify-between items-center">
            <div>
                <h1 className="font_futura text-[22px] text-black">Catalogue Carousel</h1>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Catalouge Carousel</span>
                </div>
            </div>
            <div className='flex gap-x-2' >
                <div className='w-64 h-10 py-2 px-5 gap-2 flex items-center bg-gray-50 border border-gray-300 rounded-full' >
                    <SearchIcon />
                    <input
                        type="text"
                        id="search"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                        className="w-full h-4 flex items-center text-sm font-[400] font_futuralt bg-transparent outline-none"
                        placeholder="Search (ID or Name)..."
                    />
                </div>
                {/* <Button
                    className="text-black"
                    my="my-0" fontSize="text-sm"
                    loading={categLoading}
                    disabled={categLoading}
                    onClick={async () => { await getCategories() }}>
                    Refetch Data
                </Button>
                <Button
                    my="my-0" fontSize="text-sm"
                    disabled={!selectedCategories || selectedCategories.length == 0}
                    onClick={onClickDelete}
                >Delete</Button> */}
            </div>
        </div>

        <section className='w-full mt-5 min-h-[30vh] bg-white rounded-2xl card_boxshadow'>
        </section>
    </>
}