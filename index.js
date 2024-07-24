import mongoose, { Schema } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://manueleze36:lA5wW9LgERvEP1fk@cluster0.cy0xgt0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFood: [String],
});

const Person = mongoose.model("Person", personSchema);

async function createPerson() {
  try {
    const person = new Person({
      name: "John",
      age: 30,
      favoriteFood: ["pizza", "hamburger"],
    });

    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
}

async function createManyPeople() {
  let arrayOfPeople = [
    {
      name: "iyke",
      age: 21,
      favoriteFood: ["cheesed pasta", "jollof", "cream pasta"],
    },
    { name: "mart", age: 24, favoriteFood: ["pasta", "jollof", "stewed rice"] },
    {
      name: "toria",
      age: 27,
      favoriteFood: ["cheesed pasta", "jollof", "hot dog"],
    },
  ];

  try {
    const result = await Person.create(arrayOfPeople);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// use model.find() to search your database
const findPeopleByName = async () => {
  try {
    const person = await Person.find({ name: "iyke" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const findOnePersonByName = async () => {
  try {
    const person = await Person.findOne({ favoriteFood: "cheesed pasta" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const findPersonById = async () => {
  try {
    const person = await Person.findById("66915467f4e050ace492ca16");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const findEditThenSave = async () => {
  try {
    const person = await Person.findById("66915467f4e050ace492ca16");
    person.favoriteFood.push("efo riro");
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const findAndUpdate = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "iyke" },
      { age: 22 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const removePersonById = async () => {
  try {
    const person = await Person.findByIdAndDelete("66915467f4e050ace492ca16");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const removeManyPeople = async () => {
  try {
    const person = await Person.deleteMany({ name: "toria" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

const queryChain = async () => {
  try {
    const person = await Person.find({ favoriteFood: "hamburger" })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

connectDB();
queryChain();
