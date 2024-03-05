import { useEffect, useRef } from "react"

const useInterval = (callback,delay) =>{
const callbackRef = useRef()
useEffect(()=>{
    callbackRef.current=callback
},[callback])


useEffect(()=>{
    if(delay==null) return
    const intervalId = setInterval(()=>callbackRef.current(),delay)
    return ()=>{clearInterval(intervalId)}
},[delay])


}
export default useInterval