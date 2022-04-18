import { axios } from '../app/axiosConfig';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_DEPARTMENTS = 'SET_DEPARTMENTS';
export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';
export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT';
export const REMOVE_DEPARTMENT = 'REMOVE_DEPARTMENT';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
export const SET_PROJECTS = 'SET_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const SET_DEPARTMENTS_EMPLOYEES = 'SET_DEPARTMENTS_EMPLOYEES';
export const UPDATE_DEPARTMENT_EMPLOYEE = 'UPDATE_DEPARTMENT_EMPLOYEE';
export const SET_PROJECTS_IN_WORK = 'SET_PROJECTS_IN_WORK';

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});

export const setDepartments = (departments) => ({
  type: SET_DEPARTMENTS,
  payload: departments,
});

export const createDepartment = (department) => ({
  type: CREATE_DEPARTMENT,
  payload: department,
});

export const updateDepartment = (department) => ({
  type: UPDATE_DEPARTMENT,
  payload: department,
});

export const removeDepartment = (id) => ({
  type: REMOVE_DEPARTMENT,
  payload: id,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const createEmployee = (employee) => ({
  type: CREATE_EMPLOYEE,
  payload: employee,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const removeEmployee = (id) => ({
  type: REMOVE_EMPLOYEE,
  payload: id,
});

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const createProject = (project) => ({
  type: CREATE_PROJECT,
  payload: project,
});

export const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const removeProject = (id) => ({
  type: REMOVE_PROJECT,
  payload: id,
});

export const setDepartmentsEmployees = (departmentsEmployees) => ({
  type: SET_DEPARTMENTS_EMPLOYEES,
  payload: departmentsEmployees,
});

export const updateDepartmentEmployee = (departmentEmployee) => ({
  type: UPDATE_DEPARTMENT_EMPLOYEE,
  payload: departmentEmployee,
});

export const setProjectsInWork = (projects) => ({
  type: SET_PROJECTS_IN_WORK,
  payload: projects,
});

export const loadDepartmentsByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { departments },
    } = await axios.get('/departments');

    dispatch(setDepartments(departments));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createDepartmentByAPI = async (dispatch, departmentData) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.post('/departments', departmentData);

    dispatch(createDepartment(data));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateDepartmentByAPI = async (dispatch, id, departmentData) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/departments/${id}`, departmentData);

    dispatch(updateDepartment(departmentData));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeDepartmentByAPI = async (dispatch, id) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`/departments/${id}`);

    dispatch(removeDepartment(id));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loadEmployeesByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { employees },
    } = await axios.get('/employees');

    dispatch(setEmployees(employees));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createEmployeeByAPI = async (dispatch, employeeData) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.post('/employees', employeeData);

    dispatch(createEmployee(data));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateEmployeeByAPI = async (dispatch, id, employeeData) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/employees/${id}`, employeeData);

    dispatch(updateEmployee(employeeData));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeEmployeeByAPI = async (dispatch, id) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`/employees/${id}`);

    dispatch(removeEmployee(id));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loadProjectsByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { projects },
    } = await axios.get('/projects');

    dispatch(setProjects(projects));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createProjectByAPI = async (dispatch, projectData) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.post('/projects', projectData);

    dispatch(createProject(data));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProjectByAPI = async (dispatch, id, projectData) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/projects/${id}`, projectData);

    const newProjectData = {
      ...projectData,
      Department: {
        ...projectData.Department,
        name: String(projectData.Department.name).toUpperCase(),
      },
    };

    dispatch(updateProject(newProjectData));
    dispatch(setErrorMessage(''));
  } catch (e) {
    console.dir(e);
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeProjectByAPI = async (dispatch, id) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`/projects/${id}`);

    dispatch(removeProject(id));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loadDepartmentsEmployeesByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { departmentsEmployees },
    } = await axios.get('/departments-employees');

    dispatch(setDepartmentsEmployees(departmentsEmployees));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateDepartmentEmployeeByAPI = async (
  dispatch,
  departmentsEmployeeData
) => {
  dispatch(setLoading(true));

  try {
    await axios.put('/departments-employees/', departmentsEmployeeData);

    const newDepartmentEmployeeDataData = {
      ...departmentsEmployeeData,
      departmentName: String(
        departmentsEmployeeData.departmentName
      ).toUpperCase(),
    };

    dispatch(updateDepartmentEmployee(newDepartmentEmployeeDataData));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loadProjectsInWorksByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { projects },
    } = await axios.get('/projects/work');

    dispatch(setProjectsInWork(projects));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};
