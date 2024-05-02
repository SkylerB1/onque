import { addPlatformsByBrandId } from "../../redux/features/brandsSlice";
import {
  connectionsLoading,
  initialiseConnections,
} from "../../redux/features/connectionSlice";
import { API_URL } from "../../utils";
import { axiosInstance } from "../../utils/Interceptor";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useConnections = () => {
  const connections = useSelector((state) => state.connections.value);
  const isConnLoading = useSelector((state) => state.connections.loading);
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const connectionsUrl = useMemo(() => `${API_URL}/user/connections`);
  const dispatch = useDispatch();

  const getConnections = async (id = brandId) => {
    try {
      dispatch(connectionsLoading(true));
      const response = await axiosInstance.get(
        connectionsUrl + `?brandId=${id}`
      );
      if (response.status === 200) {
        const { data } = response;
        dispatch(initialiseConnections(data));
        dispatch(addPlatformsByBrandId({ id, data }));
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching connections");
    }
  };

  return {
    connections,
    isConnLoading,
    getConnections,
  };
};

export default useConnections;
