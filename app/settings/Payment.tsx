"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import cardData from "./card-data.json";
import CustomBox from "@/app/components/custom-box/CustomBox";
import visa from "@/public/images/card-brand/visa.png";
import jcb from "@/public/images/card-brand/jcb.png";
import mastercard from "@/public/images/card-brand/mastercard.png";
import amex from "@/public/images/card-brand/american-express.png";
import { TbTrashXFilled } from "react-icons/tb";
import moment from "moment";
import { formatCreditCardNumber } from "@/app/utils";
interface ICard {
  cardId: string;
  type: string;
  expDate: string;
}
interface IPropsCard extends ICard {
  isDefault: boolean;
  onRemove: (_cardId: string) => void;
  onSetDefault: (_cardId: string) => void;
}

const CARD_TYPES = ["visa", "mastercard", "jcb", "americanexpress"];
const Card = memo((props: IPropsCard) => {
  const { cardId, type, expDate, isDefault, onRemove, onSetDefault } = props;
  const isCardExpired =
    moment(expDate).isBefore(new Date(), "year") &&
    moment(expDate).isBefore(new Date(), "month");

  const logo = useMemo(() => {
    switch (type) {
      case "visa":
        return visa.src;
      case "mastercard":
        return mastercard.src;
      case "jcb":
        return jcb.src;
      case "americanexpress":
        return amex.src;
      default:
        return "";
    }
  }, [type]);

  const statusBadge = (
    <div
      onClick={
        !isDefault && !isCardExpired ? () => onSetDefault(cardId) : undefined
      }
      className={`badge badge-lg rounded-md font-medium ${isDefault
          ? "badge-success animate-bounce-once cursor-none"
          : isCardExpired
            ? "badge-error animate-appearance-once cursor-not-allowed"
            : "animate-appearance-once cursor-pointer border-0 border-black hover:underline"
        } truncate`}
    >
      {isDefault ? "Default" : isCardExpired ? "Expired" : "Set as default"}
    </div>
  );

  return (
    <CustomBox className="mb-2 grid h-[calc(68px+2rem)] grid-cols-12 gap-x-3 gap-y-2 border-[1px] p-4">
      <div className="col-span-3 flex items-center justify-center md:col-span-2">
        <CustomBox className="flex h-[50px] w-[80px] items-center justify-center shadow-none hover:shadow-none">
          <img
            src={logo}
            width="50"
            height="50"
            alt="img"
            className="max-w-full"
          />
        </CustomBox>
      </div>
      <div className="col-span-9 grid grid-rows-2 gap-2 md:col-span-6">
        <div className="row-span-1 font-bold">
          {formatCreditCardNumber(cardId)}
        </div>
        <div className="row-span-1">
          Exp. date {moment(expDate).format("MM/YY")}
        </div>
      </div>
      <div className="col-span-8 flex items-center justify-center md:col-span-2">
        {statusBadge}
      </div>
      <div className="col-span-4 flex items-center justify-center md:col-span-2">
        {!isDefault && (
          <button
            className="btn btn-ghost hover:bg-[transparent]"
            onClick={() => onRemove(cardId)}
          >
            <TbTrashXFilled
              size="1.5rem"
              className="animate-appearance-once transition-all duration-200 hover:text-error"
            />
          </button>
        )}
      </div>
    </CustomBox>
  );
});

const useCards = () => {
  const [listCard, setListCard] = useState<Array<IPropsCard>>([]);

  const handleRemoveCard = (cardId: string) => {
    setListCard((prevList) => prevList.filter((c) => c.cardId !== cardId));
  };

  const handleSetDefault = (cardId: string) => {
    setListCard((prevList) =>
      prevList.map((c) => {
        c.isDefault = cardId === c.cardId;
        return c;
      })
    );
  };

  useEffect(() => {
    const newListCard: Array<IPropsCard> = cardData
      .map((c, i) => {
        return {
          cardId: c.cardId,
          expDate: c.expDate,
          type: CARD_TYPES.includes(c.type) ? c.type : "visa",
          isDefault: i === 0,
          onRemove: handleRemoveCard,
          onSetDefault: handleSetDefault,
        };
      })
      .slice(0, 20);
    setListCard(newListCard);
  }, []);

  return { listCard };
};

function Payment() {
  const { listCard } = useCards();
  const heightCardsContainer = `calc(${68 * 10}px + ${0.5 * 9}rem)`;
  return (
    <div className="grid grid-cols-12 gap-2 p-2">
      <div
        className="overflow-overlay col-span-12 md:col-span-6"
        style={{ height: heightCardsContainer }}
      >
        <CustomBox className="p-4 shadow-none hover:shadow-none">
          {listCard.map((cardInfo) => (
            <Card key={cardInfo.cardId} {...cardInfo} />
          ))}
        </CustomBox>
      </div>
      <div className="overflow-overlay col-span-12 md:col-span-6"></div>
    </div>
  );
}

export default Payment;
