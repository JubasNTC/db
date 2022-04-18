import {
  CREATE_DEPARTMENT,
  CREATE_EMPLOYEE,
  CREATE_PROJECT,
  REMOVE_DEPARTMENT,
  REMOVE_EMPLOYEE,
  REMOVE_PROJECT,
  SET_DEPARTMENTS,
  SET_DEPARTMENTS_EMPLOYEES,
  SET_EMPLOYEES,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_PROJECTS,
  SET_PROJECTS_IN_WORK,
  UPDATE_DEPARTMENT,
  UPDATE_DEPARTMENT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATE_PROJECT,
} from '../actions/app';

const initialState = {
  isLoading: false,
  errorMessage: '',
  departments: [],
  employees: [],
  projects: [],
  departmentsEmployees: [],
  projectsInWork: [],
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: payload,
      };

    case SET_DEPARTMENTS:
      return {
        ...state,
        departments: payload,
      };

    case CREATE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.concat(payload),
      };

    case UPDATE_DEPARTMENT: {
      const index = state.departments.findIndex(({ id }) => id === payload.id);
      const updatedDepartments = Array.from(state.departments);
      updatedDepartments[index] = payload;

      return {
        ...state,
        departments: updatedDepartments,
      };
    }

    case REMOVE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(({ id }) => id !== payload),
      };

    case SET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };

    case CREATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.concat(payload),
      };

    case UPDATE_EMPLOYEE: {
      const index = state.employees.findIndex(({ id }) => id === payload.id);
      const updatedEmployees = Array.from(state.employees);
      updatedEmployees[index] = payload;

      return {
        ...state,
        employees: updatedEmployees,
      };
    }

    case REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(({ id }) => id !== payload),
      };

    case SET_PROJECTS:
      return {
        ...state,
        projects: payload,
      };

    case CREATE_PROJECT:
      return {
        ...state,
        projects: state.projects.concat(payload),
      };

    case UPDATE_PROJECT: {
      const index = state.projects.findIndex(({ id }) => id === payload.id);
      const updatedProjects = Array.from(state.projects);
      updatedProjects[index] = payload;

      return {
        ...state,
        projects: updatedProjects,
      };
    }

    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(({ id }) => id !== payload),
      };

    case SET_DEPARTMENTS_EMPLOYEES:
      return {
        ...state,
        departmentsEmployees: payload,
      };

    case UPDATE_DEPARTMENT_EMPLOYEE: {
      const index = state.departmentsEmployees.findIndex(
        ({ employeeId }) => employeeId === payload.employeeId
      );
      const updatedDepartmentsEmployees = Array.from(
        state.departmentsEmployees
      );
      updatedDepartmentsEmployees[index] = payload;

      return {
        ...state,
        departmentsEmployees: updatedDepartmentsEmployees,
      };
    }

    case SET_PROJECTS_IN_WORK:
      return {
        ...state,
        projectsInWork: payload,
      };

    default:
      return state;
  }
};

export { appReducer };
