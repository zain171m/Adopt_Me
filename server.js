import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// mock data
const pets = [
  {
    id: 1,
    animal: "dog",
    name: "Luna",
    breed: "Husky",
    images: [
      "https://placedog.net/500",
      "https://headsupfortails.com/cdn/shop/articles/Siberian_Husky_in_India_dfb4c5ac-d284-4448-9479-6522e13df157.jpg?v=1758091506",
    ],
    city: "Seattle",
    state: "WA",
    description: "Friendly husky who loves snow",
  },
  {
    id: 2,
    animal: "cat",
    name: "Milo",
    breed: "Tabby",
    images: ["https://picsum.photos/500/500"],
    city: "Austin",
    state: "TX",
    description: "Lazy but loving cat",
  },
  {
    id: 3,
    animal: "dog",
    name: "Charlie",
    breed: "Golden Retriever",
    images: ["https://placedog.net/501"],
    city: "Denver",
    state: "CO",
    description: "Playful retriever",
  },
];

const breeds = {
  dog: ["Husky", "Golden Retriever", "Pug"],
  cat: ["Tabby", "Persian"],
};

// 🐶 SEARCH endpoint (main one)
app.get("/pets", (req, res) => {
  const { animal, breed, id } = req.query;

  let result = pets;

  if (animal) {
    result = result.filter((p) => p.animal === animal);
  }

  if (breed) {
    result = result.filter((p) => p.breed.includes(breed));
  }

  if (id) {
    result = result.filter((p) => p.id === Number(id));
  }

  res.json({
    pets: result,
  });
});

// 🐾 BREEDS endpoint
app.get("/breeds", (req, res) => {
  const { animal } = req.query;

  res.json({
    breeds: breeds[animal] || [],
  });
});

app.get("/pets/:id", (req, res) => {
  const id = Number(req.params.id);

  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }

  res.json({ pets: [pet] });
});

app.listen(3001, () => {
  console.log("Mock API running on port 3001");
});
