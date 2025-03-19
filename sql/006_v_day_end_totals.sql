drop view if exists day_end_totals;

create view day_end_totals as with mono_total as (
    select balance_after as mono_balance,
        date (operation_date),
        row_number() over (
            partition by date (operation_date)
            order by operation_date desc
        ) as row_no
    from transaction_monobank
),
pb_total as (
    select balance_after as pb_balance,
        date (operation_date),
        row_number() over (
            partition by date (operation_date)
            order by operation_date desc
        ) as row_no
    from transaction_privatbank
)
select date,
    coalesce(mono_balance, 0) as mono_balance,
    coalesce(pb_balance, 0) as pb_balance,
    (
        coalesce(mono_balance, 0) + coalesce(pb_balance, 0)
    ) as total
from mono_total
    left join pb_total using (date)
where mono_total.row_no = 1
    or pb_total.row_no = 1
order by date desc;