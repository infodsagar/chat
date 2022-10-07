export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(()=>{
   const jsonValue = localStorage.getItem('chat')

   if(jsonValue != null){
    return JSON.parse(jsonValue);
   }
   if(typeof initialValue === 'function')
  });
  


  return;
}
