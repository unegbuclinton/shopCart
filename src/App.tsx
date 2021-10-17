import {useState} from 'react'
import {useQuery} from 'react-query'
//components
import Item from './Items/Item';
import Cart from './Cart/Cart';
import  Drawer  from '@material-ui/core/Drawer';
import  LinearProgress  from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import  AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import  Badge  from '@material-ui/core/Badge';
//styles
import {wrapper,StyledButton} from './App.styles'
import { promises } from 'fs';
import { Wrapper } from './Items/Item.styles';
import { AmpStoriesOutlined } from '@material-ui/icons';

//Types

export type  CartItemType ={
  id :number;
  category: string;
  description: string;
  image: string;
  price: any;
  title: string;
  amount: number;

}


const getproducts = async (): Promise<CartItemType[]> => await (await fetch ('https://fakestoreapi.com/products')).json(); 

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const {data, isLoading , error} = useQuery<CartItemType[]>('products',getproducts);
  console.log(data)

  const getTotalItem =(items: CartItemType[])=> items.reduce((ack:number,item)=>ack+item.amount,0);

  const handleAdditem = (clicked:CartItemType)=> {
    setCartItems(prev =>{
      // 1. is the item already in the cart

      const isItemInCart = prev.find(item => item.id === clicked.id);

      if(isItemInCart) {
        return prev.map(item=> item.id === clicked.id ? {...item, amount: item.amount + 1 } : item );
      }

      // First time the item is added

      return [...prev, {... clicked, amount: 1}];
    })
  };

  const handleRemoveFromCart = (id:number)=> {
    setCartItems(prev=>(
      prev.reduce((ack,item)=>{
        if (item.id === id){
          if (item.amount === 1) return ack;
          return[...ack, {...item, amount: item.amount - 1}];
        }else {
          return [...ack, item];
        }
      },[] as CartItemType[])
    ))
  };

  if (isLoading) return <LinearProgress/>

  if (error) return <div>Something is Wrong.....</div>
  return (
   
    <Wrapper>
      <Drawer anchor= 'right' open={cartOpen} onClose={()=> setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAdditem} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
          <Badge badgeContent={getTotalItem(cartItems)} color ='error'>
            <AddShoppingCartIcon/>
          </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item=>(  
          <Grid item key={item.id} xs={12} sm={4}> 
            <Item item={item} handleAddItem={handleAdditem}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  
  ); 
};

export default App;
