export const foodData = [
  {
    id: "Cheese",
    isLow: true,
    shared: true,
    useBy: "2023-05-15",
    purchaseDate: "2023-07-03",
  },
  {
    id: "Ham",
    isLow: false,
    shared: false,
    useBy: "2023-03-23",
    purchaseDate: "2023-07-03",
  },
  {
    id: "Onion",
    isLow: true,
    shared: false,
    useBy: "2023-09-15",
    purchaseDate: "2023-07-03",
  },
  {
    id: "Soup",
    isLow: false,
    shared: true,
    useBy: "2025-05-04",
    purchaseDate: "2023-07-03",
  },
  {
    id: "Chicken",
    isLow: false,
    shared: true,
    useBy: "2023-05-01",
    purchaseDate: "2023-04-25",
  },
  {
    id: "Basil",
    isLow: true,
    shared: true,
    useBy: "2023-04-26",
    purchaseDate: "2023-04-29",
  },
];

export const experiment = [
  {
    expected: "Start",
    title: "Press Start",
  },
  {
    expected: "low-Cheese",
    title: "Mark the cheese as high",
  },
  {
    expected: "delete-Soup",
    title: "Delete soup",
  },
  {
    expected: "info-Ham",
    title: "Get info for ham",
  },
  {
    expected: "waste-Ham",
    title: "Waste ham",
  },
  {
    expected: "delete-Ham",
    title: "Delete ham",
  },
  {
    expected: "shared-Onion",
    title: "Add onion to shared pantry",
  },
  {
    expected: "shared-Chicken",
    title: "Remove chicken from shared pantry",
  },
  {
    expected: "low-Basil",
    title: "Mark Basil as high",
  },
  {
    expected: "waste-Cheese",
    title: "Waste the Cheese",
  },
  {
    expected: "info-Onion",
    title: "Get info for onion",
  },
  {
    expected: "delete-Chicken",
    title: "Delete the Chicken",
  },
  {
    expected: "delete-Basil",
    title: "Delete the Basil",
  },
  {
    expected: "low-Ham",
    title: "Mark the Ham as low",
  },
  {
    expected: "waste-Onion",
    title: "Waste the Onion",
  },
  {
    expected: "info-Soup",
    title: "Get info for soup",
  },
  { expected: "end", title: "end" },
];
