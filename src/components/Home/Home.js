import React, {useEffect, useState} from 'react'
import './Home.css';
import Banner from '../../assets/banner_home.jpg'
import ProductItem from '../Product/Product';


export default function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const url = 'https://fakestoreapi.com/products';
        fetch(url)
        .then(response => response.json())
        .then(data => setProducts(data))
    }, [])


    return (
        <div className='home'>
                <div className='home_container'>
                    <img 
                        className='home_image'
                        src={Banner}
                        alt=''
                    />
                    <div className='home_row'>
                        {
                            products.slice(0, 2).map(product => 
                                <ProductItem key={product.id} product={product}/>
                            )
                        }
                    </div>
                    <div className='home_row'>
                        {
                            products.slice(2, 5).map(product => 
                                <ProductItem key={product.id} product={product}/>
                            )
                        }
                    </div>
                    <div className='home_row'>
                        {
                            products.slice(5,7).map(product => 
                                <ProductItem key={product.id} product={product}/>
                            )
                        }
                    </div>
                </div>
        </div>
    )
}
