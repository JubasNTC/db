-- Выборка данных

-- однотабличная выборка

SELECT
COUNT(*) AS today_finished_project_count
FROM public.projects
WHERE date_end_real <= CURRENT_DATE;

-- соединение таблиц (join) Доделать с пустыми деп.

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
WHERE p.date_end_real IS NOT NULL;

-- для реализации проекта

SELECT
    p.id,
    p.department_id, 
    p.name,
    p.cost,
    (
        p.cost - DATE_PART(
            'month',
            AGE(p.date_end, p.date_beg)
        ) * dee.department_month_salary
    ) AS predicted_profit
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


-- Вставка данных

-- однотабличная вставка //insert возращет значение исправить

INSERT INTO public.employees
(last_name, first_name, pather_name, position, salary)
VALUES 
('Дудков', 'Олег', 'Альбертович', 'Младший разработчик', 500);

INSERT INTO public.departments_employees
(department_id, employee_id)
VALUES 
(
    (
    	SELECT id 
    	FROM public.departments 
    	WHERE name = 'ИТ'
    ),
    (
    	SELECT id 
    	FROM public.employees 
    	WHERE last_name = 'Дудков' AND 
              first_name = 'Олег' AND 
              pather_name = 'Альбертович'
    )
);

-- многотабличная вставка в рамках транзакции // анонимный блок

TRUNCATE TABLE public.projects;

ALTER TABLE public.projects DROP CONSTRAINT ck_projects_date_end;

ALTER TABLE public.projects
ADD CONSTRAINT ck_projects_date_end CHECK (
	DATE_PART(
	'month',
		AGE(date_end, date_beg)
	) <= 2
);


BEGIN;

INSERT INTO public.projects (department_id, name, cost, date_beg, date_end)
VALUES 
(
    (
    	SELECT id 
    	FROM public.departments 
    	WHERE name = 'ИТ'
    ),
    'Разработка сайта одностраничника', 15000, '2021-05-14', '2021-09-11'
);

ROLLBACK;


ALTER TABLE public.projects DROP CONSTRAINT ck_projects_date_end;

ALTER TABLE public.projects
ADD CONSTRAINT ck_projects_date_end CHECK (date_end >= date_beg);


-- Удаление данных

-- удаление по фильтру и удаление из связанных таблиц

DELETE FROM public.departments 
WHERE id IN (
	SELECT p.department_id
	FROM public.projects AS p
	INNER JOIN (
	    SELECT department_id
	    FROM public.departments_employees
	    GROUP BY department_id
	    HAVING COUNT(*) >= 3
	) AS de ON  p.department_id = de.department_id
	WHERE p.date_end_real IS NOT NULL
	GROUP BY p.department_id
	HAVING COUNT(*) > 0
);


-- удаление в рамках транзакции


BEGIN;

DELETE FROM public.departments 
WHERE id IN (
    SELECT id
    FROM public.employees
    WHERE salary = (
        SELECT MIN(salary) as salary
        FROM public.employees
    )
    LIMIT 1
);

ROLLBACK;


BEGIN;

DELETE FROM public.departments 
WHERE id IN (
	SELECT p.department_id
	FROM public.projects AS p
	INNER JOIN (
	    SELECT department_id
	    FROM public.departments_employees
	    GROUP BY department_id
	    HAVING COUNT(*) >= 3
	) AS de ON  p.department_id = de.department_id
	WHERE p.date_end_real IS NOT NULL
	GROUP BY p.department_id
	HAVING COUNT(*) > 0
);

ROLLBACK;
