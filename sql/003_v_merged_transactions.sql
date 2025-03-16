drop view if exists merged_transactions;

create view merged_transactions as with m as (
    select operation_date,
        memo,
        amount,
        balance_after,
        'mono' as card_number
    from transaction_monobank
),
p as (
    select operation_date,
        memo,
        amount,
        balance_after,
        card_number
    from transaction_privatbank
)
select *
from m
union all
select *
from p
order by operation_date desc;