import NextAdventureItem from "./NextAdventureItem"
import shanghai from '../images/shangai.png'
import sydney from '../images/sydney.png'
import kyoto from '../images/kyoto.png'

const NextAdventures = () => {
  return (
    <section className="px-16 py-8">
        <h3 className="text-slate-500 text-xl font-bold md:text-2xl">Bu uçuş fırsatlarıyla bir sonraki maceranızı bulun</h3>
        <div className="flex flex-col gap-4 items-center justify-between py-5 xl:flex-row 2xl:justify-center">
            <NextAdventureItem title="Bund, Şanghay" desc="Çin'in en uluslararası şehri" price="5000TL" img={shanghai}/>
            <NextAdventureItem title="Sidney Opera Binası, Sidney" desc="Ünlü liman boyunca yürüyüşe çıkın" price="7000TL" img={sydney}/>
            <NextAdventureItem title="Kōdaiji Tapınağı, Kyoto" desc="Gion bölgesinde zamanda geriye adım atın" price="10000TL" img={kyoto}/>
        </div>
    </section>
  )
}

export default NextAdventures