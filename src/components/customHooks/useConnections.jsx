import { initialiseConnections } from "../../redux/features/connectionSlice";
import { API_URL } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useConnections = () => {
  const connections = useSelector((state) => state.connections.value);
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id
  const connectionsUrl = useMemo(() => `${API_URL}/user/connections`);
  const dispatch = useDispatch();


  const getConnections = async (id = brandId) => {
    try {
      const response = await axiosInstance.get(connectionsUrl + `?brandId=${id}`);
      if (response.status === 200) {
        dispatch(initialiseConnections(response.data));
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching connections");
    }
  };


  return {
    connections,
    getConnections,
  };
};

export default useConnections;
