import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heading, Button } from "@radix-ui/themes"

import { getAllAreas, getAllCategories, getRandomMeal } from "../services/mealApi";
import DropDownMenu from "./DropDownMenu";
import DarkMode from "./DarkMode";

interface Area {
  strArea: string;
}

interface Category {
  strCategory: string;
}

interface RandomMeal {
  strMeal: string;
}


export default function Header() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [randomMeal, setRandomMeal] = useState<RandomMeal>();

  useEffect(() => {
    const fetchDatas = async () => {
      const areas = await getAllAreas();
      const categories = await getAllCategories();
      const randomMeal = await getRandomMeal();
      setAreas(areas);
      setCategories(categories);
      setRandomMeal(randomMeal);
    }
    fetchDatas();
  }, []);



  return (
    <>
      <header className='grid grid-cols-2  sm:grid-cols-header w-full p-4 border-b'>
        <Link className="flex items-center justify-start space-x-2" to="/">
          <img src="/favicon/favicon.ico" alt="Logo d'un cerveau vu du haut" className="h-8" />
          <Heading as="h2" size="5" className="h1">Get your Meal</Heading>
        </Link>
        <nav className="items-center justify-center space-x-4 hidden sm:flex">
          <Link to="/" className="text-primary hover:text-secondary">Home</Link>
          <DropDownMenu name="Area" items={areas} label="strArea" />
          <DropDownMenu name="Category" items={categories} label="strCategory" />
        </nav>
        <div className='items-center justify-end space-x-4 flex'>
          <DarkMode />
          <Link to={`/meal/${randomMeal?.strMeal}`} className="text-primary hover:text-secondary">
          <Button color="orange" variant="soft">Random Meal</Button>
          </Link>
        </div>
      </header>
      <nav className="flex sm:hidden items-center justify-start border-b px-4 py-2 space-x-4">
        <Link to="/" className="text-primary hover:text-secondary">Home</Link>
        <DropDownMenu name="Area" items={areas} label="strArea" />
        <DropDownMenu name="Category" items={categories} label="strCategory" />
      </nav>
    </>
  )
}