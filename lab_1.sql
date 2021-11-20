-- DDL

CREATE TABLE IF NOT EXISTS public.departments
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name character varying(20) NOT NULL,
    CONSTRAINT uq_departments_name UNIQUE (name),
    CONSTRAINT pk_departments_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.employees
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    first_name character varying(20) NOT NULL,
    pather_name character varying(20),
    last_name character varying(20) NOT NULL,
    position character varying(50) NOT NULL,
    salary money NOT NULL,
    CONSTRAINT pk_employees_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.departments_employees
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    department_id integer NOT NULL,
    employee_id integer NOT NULL,
    CONSTRAINT pk_departments_employees PRIMARY KEY (id),
    CONSTRAINT fk_depts_employees_employees FOREIGN KEY (employee_id)
    REFERENCES public.employees (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID,
    CONSTRAINT fk_deps_employees_depts FOREIGN KEY (department_id)
    REFERENCES public.departments (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID
);

CREATE TABLE IF NOT EXISTS public.projects
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    department_id integer NOT NULL,
    name character varying(200) NOT NULL,
    cost money NOT NULL,
    date_beg date NOT NULL,
    date_end date NOT NULL,
    date_end_real date DEFAULT NULL,
    CONSTRAINT uq_projects_name UNIQUE (name),
    CONSTRAINT ck_projects_date_end CHECK (date_end >= date_beg),
    CONSTRAINT ck_projects_date_end_real CHECK (date_end_real >= date_beg),
    CONSTRAINT pk_projects PRIMARY KEY (id),
    CONSTRAINT projects FOREIGN KEY (department_id)
    REFERENCES public.departments (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID
);
