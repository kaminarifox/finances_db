drop view if exists month_total;

create view month_total as
select to_char(operation_date, 'YYYY-MM') as month,
    SUM(amount) as amount,
    case
        when amount < 0 then true
        else false
    end as is_loss
from merged_transactions
group by month,
    is_loss
order by month desc;