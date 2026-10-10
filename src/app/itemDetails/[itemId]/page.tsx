import { IProductAll } from '@/app/types';
import React from 'react';

const ItemDetails = async({params}:{params:{itemId:string}}) => {
    const { itemId } = await params;

    
    // api link 1
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${itemId}`);
    const data:IProductAll[] =await res.json();
    console.log(data);
    

    return (
        <div>
            ItemDetails
        </div>
    );
};

export default ItemDetails;