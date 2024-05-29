import { create } from 'zustand'
import toaster from "@/utils/toast_function";
import axios from "axios";
import useSession from "./useSession";
const { admin } = useSession.getState();

const useCarousel = create((set, get) => ({

    categories: [],
    carouselLoading: false,

    getHomeCarousel: async (callback) => {
        if (!admin?._id) return console.log("no admin data")

        set(() => ({ carouselLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/carousels/home/get`, { withCredentials: true })
            callback(data.carousel);
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ carouselLoading: false }))
    },

    updateHomeCarousel: async (slides, callback) => {
        if (!admin?._id) return console.log("no admin data")

        set(() => ({ carouselLoading: true }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/carousels/home/update`, { slides }, { withCredentials: true });
            toaster("success", data?.msg)
            callback(data.carousel);
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ carouselLoading: false }))
    },

    getOneCategory: async (category_id, callback) => {
        if (!admin) return

        set(() => ({ categLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/categories/get-one?category_id=${category_id}`, { withCredentials: true })
            callback(data.category)
        } catch (error) {
            console.log(error)
            toaster("error", error.response?.data?.msg)
        }
        return set(() => ({ categLoading: false }))
    },

    createCategory: async (category) => {
        if (!admin || admin.role === "customer") return

        set(() => ({
            categLoading: true
        }))
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/categories/create`, category, { withCredentials: true })
            set(() => ({ categories: data.categories }))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({
            categLoading: false
        }))
    },

    updateCategory: async (update) => {
        if (!admin || admin.role === "customer") return

        set(() => ({
            categLoading: true
        }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/categories/update`, update, { withCredentials: true })
            set(() => ({ categories: data.categories }))
            toaster("success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ categLoading: false }))
    },

    deleteCategories: async (categoriesToDelete) => {
        if (!admin || admin.role === "customer") return

        set(() => ({ categLoading: true }))
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/categories/delete`, { categories: categoriesToDelete }, { withCredentials: true })
            set(() => ({ categories: data.categories }))
            toaster(data.deletedCount < 1 ? "info" : "success", data.msg)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        return set(() => ({ categLoading: false }))
    }
}))

export default useCarousel