import React from 'react'
import { CardsData } from '../../../../components/Datadata';
import "../Dash.css";
import DashCardItem from './DashCardItem';

const DashCard = () => {
  return (
    <div className="chartcards">
    {CardsData.map((card, id) => {
      return (
        <div className="parentContainer" key={id}>
          <DashCardItem
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      );
    })}
  </div>
  );
}

export default DashCard;
