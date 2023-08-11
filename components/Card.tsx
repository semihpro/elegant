import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type CardProps = {
  id: number;
  name: string;
  image_path1: string;
};

const Card: React.FC<{ card: CardProps }> = ({ card }) => {
   return (
    <div className="card bg-gray text-center">
      <img src={`/images/product/${card.id}/image_path1/${card.image_path1}`} alt=""/>
      <p>{card.name}</p>
      <button className="btn btn-gray" type="button">Özellikler</button>
    </div>
  )
};

export default Card;
