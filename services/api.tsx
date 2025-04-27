import axios from 'axios'

const BASE_URL = 'https://dashboard-backend-1azi.onrender.com/api'
export const loadChartData = async (dataRoute: string) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/${dataRoute}`)
        // console.log({dataRoute, data})
        return data
    } catch (error: any) {
        console.error(error)
    }
}