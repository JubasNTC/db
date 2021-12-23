-- Представления

-- 1

CREATE OR REPLACE VIEW view_1 as
SELECT
    p.id,
    p.department_id, 
    p.name, 
    dee.working_employees
FROM public.projects p
INNER JOIN (
    SELECT de.department_id, 
    STRING_AGG(
        CONCAT(e.last_name, ' ', e.first_name),
        ', '
    ) as working_employees
    FROM public.departments_employees de
    INNER JOIN public.employees e 
        ON de.employee_id = e.id
    GROUP BY de.department_id
) AS dee
ON p.department_id = dee.department_id
WHERE p.date_beg <= '2021-01-01' AND p.date_end <= '2021-12-31';


-- 2

CREATE OR REPLACE VIEW view_2 as
SELECT
    p.id,
    p.department_id, 
    p.name,
    dee.department_month_salary
FROM public.projects p
INNER JOIN (
    SELECT de.department_id, 
    SUM(
        e.salary
    ) as department_month_salary
    FROM public.departments_employees de
    INNER JOIN public.employees e 
        ON de.employee_id = e.id
    GROUP BY de.department_id
) AS dee
ON p.department_id = dee.department_id
WHERE p.date_end_real IS NULL;


-- Хранимые процедуры

-- без параметров

CREATE OR REPLACE PROCEDURE proc_1()
LANGUAGE SQL
AS $$

SELECT 
    d.id,
    d.name,
    AVG(
        DATE_PART(
            'month',
            AGE(p.date_end, p.date_beg)
        )
    )
FROM public.departments AS d
INNER JOIN public.projects AS p ON d.id = p.department_id
GROUP BY d.id;

$$;

call proc_1();


-- с входными параметрами
-- Перемножение таблиц
CREATE OR REPLACE FUNCTION func_2("first_employee" varchar, "second_employee" varchar)

RETURNS TABLE(id int, name varchar)

LANGUAGE SQL
AS $$

SELECT DISTINCT
    id,
    name
FROM public.projects
WHERE department_id IN (
    SELECT DISTINCT
    department_id
    FROM public.departments_employees dp
    INNER JOIN public.employees AS e ON dp.employee_id = e.id
    WHERE e.last_name = "first_employee" OR e.last_name = "second_employee"
);

$$;

SELECT * FROM func_2('Петров', 'Ветров');


-- с выходными параметрами

CREATE OR REPLACE FUNCTION func_3("department_name" varchar)

RETURNS TABLE(max_time_to_implement float8)

LANGUAGE SQL
AS $$

SELECT
MAX(
    DATE_PART(
        'month',
        AGE(p.date_end, p.date_beg)
    ) 
) AS max_time_to_implement
FROM public.projects p
INNER JOIN public.departments AS d ON p.department_id = d.id
WHERE d.name = "department_name"

$$;

SELECT * FROM func_3('ИТ');


-- Триггера

-- Триггера на вставку

CREATE OR REPLACE FUNCTION trigger_1_f()
  RETURNS trigger 
LANGUAGE plpgsql
AS $$
BEGIN
   IF EXISTS (select 1 FROM public.employees WHERE last_name = new.last_name) THEN
      RAISE EXCEPTION 'This employe is alredy exist';
   END IF;
   RETURN NEW;
END
$$;

CREATE TRIGGER trigger_1
BEFORE INSERT OR UPDATE ON public.employees
FOR EACH ROW 
EXECUTE PROCEDURE trigger_1_f();


INSERT INTO public.employees (last_name, first_name, pather_name, position, salary)
VALUES 
('Иванов', 'Иван', 'Иванович', 'Директор', 10000);



-- Триггера на модификацию

CREATE OR REPLACE FUNCTION trigger_2_f()
  RETURNS trigger 
LANGUAGE plpgsql
AS $$
BEGIN
   IF (new.date_end < old.date_beg) THEN
      RAISE EXCEPTION 'Invalid dates';
   END IF;
   RETURN NEW;
END
$$;

CREATE TRIGGER trigger_2
BEFORE UPDATE ON public.projects
FOR EACH ROW 
EXECUTE PROCEDURE trigger_2_f();


UPDATE public.projects SET date_end = '2021-01-31' WHERE id = 3;

-- Триггера на удаление

CREATE OR REPLACE FUNCTION trigger_3_f()
  RETURNS trigger 
LANGUAGE plpgsql
AS $$
BEGIN
   IF (old.date_end_real IS NULL) THEN
      RAISE EXCEPTION 'Invalid dates';
   END IF;
   RETURN NEW;
END
$$;

CREATE TRIGGER trigger_3
BEFORE DELETE ON public.projects
FOR EACH ROW 
EXECUTE PROCEDURE trigger_3_f();


-- Курсор

CREATE OR REPLACE FUNCTION profit_completed_projects_by_date("finish_date" date)
RETURNS TABLE(profit money)
LANGUAGE 'plpgsql'
AS $$
    DECLARE
        project_department_id int;
        project_duration_in_months int;
        project_cost money default 0;
        projet_profit money default 0;
        department_month_salary money default 0;
        total_profit money default 0;

        cur1 CURSOR FOR 
            SELECT
                department_id,
                DATE_PART(
                    'month',
                    AGE(date_end, date_beg)
                ) as project_duration_in_months,
                cost
            FROM public.projects
            WHERE date_end_real IS NOT NULL AND 
                  date_end_real >= "finish_date" AND 
                  date_end_real <= CURRENT_DATE;
    BEGIN
        OPEN cur1;
          LOOP
            FETCH cur1 INTO
                project_department_id,
                project_duration_in_months,
                project_cost;
            
            IF NOT FOUND THEN EXIT; END IF;
            
            SELECT
                SUM(
                    e.salary
                ) INTO department_month_salary
            FROM public.departments_employees de
            INNER JOIN public.employees e 
                ON de.employee_id = e.id
            WHERE de.department_id = project_department_id
            GROUP BY de.department_id;

            projet_profit = project_cost - (department_month_salary * project_duration_in_months);
            total_profit = total_profit + projet_profit;
            
            raise notice 'project_department_id: %', project_department_id;
            raise notice 'project_duration_in_months: %', project_duration_in_months;
            raise notice 'department_month_salary: %', department_month_salary;
            raise notice 'project_cost: %', project_cost;
            raise notice 'projet_profit: %', projet_profit;
            raise notice '-------------------------------------';
            
        END LOOP;
          CLOSE cur1;
        
        return QUERY
        SELECT total_profit AS profit;
    END;
$$;

SELECT * FROM profit_completed_projects_by_date('2020-01-01');
