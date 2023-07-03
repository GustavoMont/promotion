import React from "react";
import { Address } from "@/models/Address";

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  return (
    <div>
      <p>{address?.city.name || "Não foi cadastrado o endereço"}</p>
    </div>
  );
};

export default AddressCard;
