create table transaction_privatbank (
    transaction_privatbank_id SERIAL primary key,
    operation_date timestamp,
    category text,
    card_number text,
    memo text,
    amount decimal(16, 4),
    currency text,
    operation_amount decimal(16, 4),
    operation_currency text,
    balance_after decimal(16, 4),
    balance_currency text,
    checksum text,
    created_at TIMESTAMP default current_timestamp,
    updated_at TIMESTAMP default current_timestamp
);

comment on column transaction_privatbank.transaction_privatbank_id is 'ID';

comment on column transaction_privatbank.category is 'Категорія';

comment on column transaction_privatbank.card_number is 'Номер картки';

comment on column transaction_privatbank.memo is 'Опис операції';

comment on column transaction_privatbank.amount is 'Сума у валюті картки';

comment on column transaction_privatbank.currency is 'Валюта картки';

comment on column transaction_privatbank.operation_amount is 'Сума у валюті транзакції';

comment on column transaction_privatbank.operation_currency is 'Валюта транзакції';

comment on column transaction_privatbank.balance_after is 'Залишок на кінець періоду';

comment on column transaction_privatbank.balance_currency is 'Валюта залишку';

comment on column transaction_privatbank.operation_date is 'Дата транзакції';

comment on column transaction_monobank.checksum is 'Контрольна сума транзакції';

comment on column transaction_privatbank.created_at is 'Дата створення запису';

comment on column transaction_privatbank.updated_at is 'Дата останнього оновлення запису';

create trigger set_updated_at before
update on transaction_privatbank for EACH row execute function update_timestamp();