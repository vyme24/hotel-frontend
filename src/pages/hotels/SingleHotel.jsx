import { useEffect, useState } from 'react';
import {useGetHotelQuery} from '../../services/hotelService';

const SingleHotel = () => {
  const {isLoading,isError, error, data, refetch, isSuccess} = useGetHotelQuery();
  const [hotels, setHotels] = useState([]);


  useEffect(() => {
    if(isSuccess && data) {
      setHotels(data.data)
    }
  

  },[data,  isSuccess, refetch, isLoading, error, isError]);
  
    return (
        <>
 dddd
</>
    )

}
export default SingleHotel;