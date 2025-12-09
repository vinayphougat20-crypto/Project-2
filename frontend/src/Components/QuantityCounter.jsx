export default function QuantityCounter({
  value,
  onIncrease,
  onDecrease,
  min =  0,
}){
   return (
    
    <div className="ProductQuantityDiv">

      {/* quantity button but don’t go below min */}
    <button className="QuantityBtn" onClick={()=>{ 
    if (value > min) onDecrease(); }} > - </button>

    <p>{value}</p> {/* Using span*/}

         {/* increase quantity button*/}
  <button className="QuantityBtn"  onClick={onIncrease}> + </button>

</div>
);

}


