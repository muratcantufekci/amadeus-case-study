const NextAdventureItem = ({ img, title, price, desc }) => {
    return (
        <div className="rounded-md shadow-xl overflow-hidden">
            <img src={img} alt="Next advanture" className="max-h-96 w-full object-cover" />
            <div className="flex justify-between p-4 gap-4">
                <div>
                    <h5 className="text-slate-600 text-lg font-semibold">{title}</h5>
                    <p className="text-slate-500 font-normal text-base">{desc}</p>
                </div>
                <span className="text-cyan-600 text-lg font-semibold">{price}</span>
            </div>
        </div>
    )
}

export default NextAdventureItem