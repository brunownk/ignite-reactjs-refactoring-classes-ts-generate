import { createContext, ReactNode, useEffect, useState, useContext} from 'react';
import api from '../services/api';

export interface IFood {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

export type FoodInput = Omit<IFood, 'id' | 'available'>;

interface FoodProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: IFood[];
  editingFood: IFood;
  addModalOpen: boolean;
  editModalOpen: boolean;
  createFood: (food: FoodInput) => Promise<void>;
  updateFood: (food: FoodInput) => Promise<void>;
  deleteFood: (id: number) => Promise<void>;
  handleEditFood: (food: IFood) => void;
  toggleAddModal: () => void;
  toggleEditModal: () => void;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodProvider({ children }: FoodProviderProps) {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  useEffect(() => {
    api
      .get<IFood[]>('/foods')
      .then(response => setFoods(response.data));
  }, [])

  async function createFood(foodInput: FoodInput) {
    try {
      const response = await api.post('/foods', {
        ...foodInput,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFood(food: FoodInput) {
    try {
      const response = await api.put(
        `/foods/${editingFood.id}`,
        {...editingFood, ...food},
      );
      
      const foodsUpdated = foods.map(food =>
        food.id !== response.data.id ? food : response.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function handleEditFood(food: IFood) {
    setEditingFood(food);
    setEditModalOpen(true);
  }
  
  function toggleAddModal() {
    setAddModalOpen(!addModalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  return (
    <FoodsContext.Provider 
      value={
        {
          foods,
          editingFood,
          addModalOpen,
          editModalOpen,
          createFood,
          updateFood,
          deleteFood,
          handleEditFood,
          toggleAddModal,
          toggleEditModal
        }
      }>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}