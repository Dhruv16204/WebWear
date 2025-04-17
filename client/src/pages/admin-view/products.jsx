import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React, { Fragment, useEffect, useState } from 'react'
import CommonForm from '@/components/common/form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '@/components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import { toast } from 'react-hot-toast';
import AdminProductTile from '@/components/admin-view/product-tile';

const intialFormData = {
  image:null,
  title:"",
  description:'',
  category: '' ,
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

const AdminProducts = () => {

  const [openCreateProduct,setOpenCreateProduct] = useState(false);
  const [formData,setFormData] = useState(intialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl,setUploadedImageUrl] = useState('');
  const [imageLoadingState,setImageLoadingState] = useState(false);
  const [currentEditedtId,setCurrentEditedId] = useState(null);

  const {productList} = useSelector(state=>state.adminProducts)

  const dispatch = useDispatch();

  function onSubmit(event){
    event.preventDefault();

    //for edit product
    currentEditedtId !== null ?
    dispatch(editProduct({
      id : currentEditedtId , 
      formData
    })).then((data)=>{
      //console.log(data , "edit")
      if(data?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(intialFormData)
        setOpenCreateProduct(false)
        setCurrentEditedId(null)
        toast.success(data?.payload?.message)
      }
    }) :
    
    //for adding new product
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProduct(false)
        setImageFile(null);
        setFormData(intialFormData)
        toast.success("Product Added Successfully")
      }
    })


  }
  //console.log(productList , uploadedImageUrl);

  //jab tak form pura fill nahi hota -> btn disable
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  //delete button fun
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success(data?.payload?.message)
      }
    });
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProduct(true)}>Add new Product</Button>
      </div>

      {/* showing products  */}
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
          productList.map((productItem)=>(
          <AdminProductTile 
          key={productItem._id} product={productItem}
          setCurrentEditedId={setCurrentEditedId}
          setOpenCreateProduct={setOpenCreateProduct}
          setFormData ={setFormData}
          handleDelete = {handleDelete}
           />)) : null
        }
      </div>

      <Sheet 
        open={openCreateProduct}
        onOpenChange={()=>{
          setOpenCreateProduct(false);
          setCurrentEditedId(null);
          setFormData(intialFormData);
        }}>

        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedtId !== null ?
                'Edit Product' : 'Add New Product' 
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile} setImageFile={setImageFile}
            uploadedImageUrl = {uploadedImageUrl}
            setUploadedImageUrl = {setUploadedImageUrl}
            setImageLoadingState = {setImageLoadingState}
            imageLoadingState = {imageLoadingState}
            isEditMode = {currentEditedtId !== null}
            />
          <div className='py-6'>
            <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText= {currentEditedtId  !== null ? 'Edit' : 'Add'}
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts