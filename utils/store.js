import { create } from "zustand";

const removeEmployee = (employees, id) =>
  employees.filter((employee) => employee.id !== id);

const addEmployee = (employees, newEmployee) => [
  ...employees,
  {
    id: Math.max(0, Math.max(...employees.map(({ id }) => id))) + 1,
    avatar: newEmployee.avatar,
    first_name: newEmployee.first_name,
    last_name: newEmployee.last_name,
    full_name: newEmployee.full_name,
    email: newEmployee.email,
    salary: newEmployee.salary,
    age: newEmployee.age,
  },
];

const useStore =
  create <
  Store >
  ((set) => ({
    employees: [],
    newEmployee: {
      id: 0,
      avatar: "",
      first_name: "",
      last_name: "",
      full_name: "",
      email: "",
      salary: 0,
      age: 0,
    },
    setEmployees: (employees) => {
      set((state) => ({
        ...state,
        employees,
      }));
    },
    removeEmployee: (id) =>
      set((state) => ({
        ...state,
        employees: removeEmployee(state.employees, id),
      })),
    editEmployee: (employee) =>
      set((state) => ({
        employees: state.employees.map((item) => {
          if (item.id === employee.id) {
            return {
              ...item,
              id: employee.id,
              avatar: employee.avatar,
              first_name: employee.first_name,
              last_name: employee.last_name,
              full_name: `${employee.first_name} ${employee.last_name}`,
              email: employee.email,
              salary: employee.salary,
              age: employee.age,
            };
          } else {
            return item;
          }
        }),
      })),
    setNewEmployee: (newEmployee) =>
      set((state) => ({
        ...state,
        newEmployee,
      })),
    addEmployee: () =>
      set((state) => ({
        ...state,
        employees: addEmployee(state.employees, state.newEmployee),
        newEmployee: {
          id: 0,
          avatar: "",
          first_name: "",
          last_name: "",
          full_name: "",
          email: "",
          salary: 0,
          age: 0,
        },
      })),
  }));

export default useStore;
