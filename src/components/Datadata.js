import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoneyIcon from '@mui/icons-material/Money';
import EventNoteIcon from '@mui/icons-material/EventNote';

export const CardsData = [

    {
        title: "New Orders",
        color: {
          backGround: "radial-gradient( 100% 100% at 100% 0, #5adaff 0, #5468ff 100% )",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: <ShoppingCartIcon />,
        series: [
          {
            name: "New Orders",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
      },
      {
        title: "Sales",
        color: {
          backGround: "-webkit-linear-gradient(0deg, #f14437 0%, #ed5b0d 99%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: <MoneyIcon />,
        series: [
          {
            name: "Sales",
            data: [10, 100, 50, 70, 80, 30, 40],
          },
        ],
      },
      {
        title: "Expenses",
        color: {
          backGround:
          "linear-gradient(90deg, rgba(193,130,10,1) 47%, rgba(240,154,30,1) 100%)",
          boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: <EventNoteIcon />,
        series: [
          {
            name: "Expenses",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ]
    },
]

