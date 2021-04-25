import { useFoods } from '../../hooks/useFoods';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

function Dashboard() {
  const {
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
   } = useFoods();
  
  return (
    <>
      <Header openModal={toggleAddModal} />
      <ModalAddFood
        isOpen={addModalOpen}
        setIsOpen={toggleAddModal}
        handleAddFood={createFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={updateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={deleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
  </>
  )
}

export default Dashboard;
