import Button from '@material-ui/core/Button'
//Types
import { CartItemType } from '../App'
import { Wrapper } from './Item.styles'

type props ={
    item: CartItemType;
    handleAddItem: (clicked: CartItemType)=> void
}


const item : React.FC<props> = ({item, handleAddItem})=>(

<Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
    </div>
    <button onClick={()=>handleAddItem(item)}> Add To Cart</button>
</Wrapper>

)

export default item
