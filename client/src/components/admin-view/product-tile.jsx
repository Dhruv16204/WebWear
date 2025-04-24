// import React from 'react'
// import { Card, CardContent, CardFooter } from '../ui/card'
// import { Button } from '../ui/button'

// const AdminProductTile = ({
//     product,
//     setCurrentEditedId,
//     setOpenCreateProduct,
//     setFormData,
//     handleDelete
// }) => {
//   return (
//     <Card className='w-full max-w-sm mx-auto transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl'>
//         <div className='relative'> 
//             <img 
//             src={product?.image}
//             alt={product?.title}
//             className='w-full h-[300px] object-cover rounded-t-lg'
//             />
//         </div>
//         <CardContent>
//             <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
//             {/* category and brand  can also be rendered*/}
//             <div className="flex justify-between items-center mb-2">
//                 <span 
//                 className={`${product?.salePrice >0 ?  'line-through' : ''} text-lg font-semibold text-primary`}
//                 style={product?.salePrice > 0 ? { textDecorationColor: "red" } : {}}
//                 >
//                     ${product?.price}
//                 </span>
//                 {
//                     product?.salePrice > 0 ? 
//                     <span className='text-lg font-bold'>${product?.salePrice}</span> : null
//                 }
//             </div>
//         </CardContent>
//         <CardFooter className='flex justify-between items-center'>
//             <Button onClick={()=>{
//                 setOpenCreateProduct(true)
//                 setCurrentEditedId(product?._id)
//                 setFormData(product)
//             }}>Edit</Button>
//             <Button onClick={()=>handleDelete(product?._id)}>Delete</Button>
//         </CardFooter>
//     </Card>
//   )
// }

// export default AdminProductTile

//final change 
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const AdminProductTile = ({
    product,
    setCurrentEditedId,
    setOpenCreateProduct,
    setFormData,
    handleDelete
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Expand card on hover
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
        {/* Image with zoom effect */}
        <div className="relative overflow-hidden rounded-t-lg">
          <motion.img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover transition-transform duration-300"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span 
                className={`${product?.salePrice > 0 ?  'line-through' : ''} text-lg font-semibold text-primary`}
                style={product?.salePrice > 0 ? { textDecorationColor: "red" } : {}}
                >
                    ${product?.price}
                </span>
                {
                    product?.salePrice > 0 ? 
                    <span className='text-lg font-bold'>${product?.salePrice}</span> : null
                }
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          {/* Edit Button - White on Hover */}
          <Button 
          onClick={()=>{
            setOpenCreateProduct(true)
            setCurrentEditedId(product?._id)
            setFormData(product)
          }}
          className="bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300"
          >
            Edit
          </Button>
          {/* Delete Button - White on Hover with Red Text */}
          <Button 
            className="bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 transition-all duration-300"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminProductTile;

