export const Nutrition = ({label, quantity, unit}) =>{
    return(
        <div className="nutrition_element">
            <p><b>{label}</b> - {quantity} {unit}</p>
        </div>
    )
}