import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
;
import axios from "axios";

const ClientList = ({ clientData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate
();

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const filteredClients = clientData.filter((client) =>
    client.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleClient = (client) => {
    // console.log(client);
    navigate("/connection?client_id=" + client);
  }

  // const getSigleClient = async (clientId) => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem("loginUser")).token;  
  //     const headers = {
  //       'x-access-token': token,
  //     };
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/clients/${clientId}`,
  //     { headers })
  //     console.log(res.data.data, "res.data.data");

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Card className="w-80 bg-[#EFEFEF]">
      <div className="ml-3 mr-3 mt-2">
        <input
          type="text"
          className="bg-gray-100 rounded-2xl text-black w-full h-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <List>
        {Array.isArray(filteredClients) && filteredClients.map((client, index) => (
          <ListItem
            key={index}
            className={`h-12 ${selectedClient === client ? 'bg-blue-200' : ''}`}
            onClick={() => handleClient(client.id)}
          >
            <ListItemPrefix>
              <div className="avatar-initial bg-blue-gray-200 px-3 py-2 rounded-full flex items-center justify-center">
                {getFirstLetter(client.clientName)}
              </div>
            </ListItemPrefix>
            <div>
              <Typography variant="small" color="blue-gray">
                {client.clientName}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>

      {selectedClient && (
        <div className="mt-4 ml-3">
          <Typography variant="medium" color="blue-gray">
            Selected Client: {selectedClient.clientName}
          </Typography>
          {/* Add more details from the selected client as needed */}
        </div>
      )}
    </Card>
  );
};

export default ClientList;
