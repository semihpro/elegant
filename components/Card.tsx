import React from "react";
import Link from "next/link";
export type CardProps = {
  id: number;
  name: string;
  image_path1: string;
};

const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  return (
    <div className="card bg-gray text-center">
      <img src={card.image_path1 ? card.image_path1 : `/no-image.jpg`} alt="" />
      <p>{card.name}</p>
      <Link type="button" className="btn btn-gray" href={`/urun/${card.id}`}>
        Detaylar
      </Link>
    </div>
  );
};

export default Card;
