import React from "react";
import { Address } from "@/models/Address";
import { Title } from "@/components/Typograph/Title";

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  return (
    <div className="h-full mt-4">
      {!address ? (
        <p className="text-red-400">* Não foi cadastrado o endereço</p>
      ) : (
        <div>
          <Title>Endereço</Title>
          <p className="text-gray-600">{address?.street}</p>
          <p className="text-gray-600">
            {address?.city?.name || "Cidade não informada"}
          </p>

          <p className="text-gray-600">
            {address?.number || "Número não informado"}
          </p>

          <p className="text-gray-600">
            {address?.neighborhood || "Bairro não informado"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
