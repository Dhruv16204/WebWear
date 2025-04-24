import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'

const AddressCard = ({
    addressInfo,
    handleDeleteAddress,
    handleEditAddress,
    setCurrentSelectedAddress,
    selectedId,
}) => {
  return (
    <Card
      onClick={() => {
        if (setCurrentSelectedAddress) {
        setCurrentSelectedAddress(addressInfo);
        toast.success("Address selected");
        }
      }}
      className={`cursor-pointer transition-all duration-300 rounded-lg shadow-md p-4 
        ${
          selectedId?._id === addressInfo?._id
          ? "border-[3px] border-red-600 bg-red-50 scale-105"
          : "border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
        }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard