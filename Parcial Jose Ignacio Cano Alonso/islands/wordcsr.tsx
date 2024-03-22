import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import { Palabras } from "../types.tsx"
import axios from "npm:axios"
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

/*
export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, palabra>) => {
    const url = new URL (req.url)
    const word = url.searchParams.get("word")

    if(!word)
    {
      throw new Error ("No se ha proporcionado nada")
    }

    const respuesta = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
    const data = await respuesta.json()
    const info = {
      word: data[0].word
    }

    return ctx.render(info)
  }
}

export default handler
*/

const Definicion: FunctionalComponent = () => {
  const [word, setWord] = useState<string>("") //variable de la api que queremos buscar
  const [words, setWords] = useState<string[]>([]) //Todos los valores de la ruta de la api, 
  //Cada valor de estos tiene un word

  const obtenerdef = async (word:string): Promise<void> => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}` //buscamos en la api
    const resp = await axios.get<{results: {resword:string}[]}>(url) //obtienes los resultados de la api
    debugger
    if(!resp)
    {
      throw new Error("Ha habido un error")
    }

    const pal = resp.data.results.map(r => r.resword)
    
    setWords(pal) //guardamos los resultados de la api en words
  }
  debugger
  return(
    <div >
      <div class="backgroundbuttons">
      <button class="clientButton" href = "/wordcsr"> Client side </button>
      <button class="serverButton" href="/wordssr"> server side </button>
      </div>
      
      <h1 class="Titulo"> My Dictionary </h1>
      <form>
        <input 
        class="input"
        type="text"
        name="word"
        placeholder="type a word"
        value={word}
        onInput={(e) => {setWord(e.currentTarget.value)}} //con setWord guardamos en word lo que hemos metido por el imput
        /><br/>
        <button class="search" onClick={() =>{
          obtenerdef(word)//le pasamos por parametro el word que hemos obtenido en el input
         }}> Search </button>
      </form>
      
         {words.length > 0 && words.map(r=> <div key ={r}> palabra: {r} </div>)}
    </div>
  )
}

export default Definicion
