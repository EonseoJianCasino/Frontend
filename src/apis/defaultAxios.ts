import axios from 'axios'

// * axios 기본 인스턴스 생성하기
const defaultAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 기본 요청 URL 설정.
})

export default defaultAxios
