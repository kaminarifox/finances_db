create table transaction_monobank (
    transaction_monobank_id SERIAL primary key,
    operation_date TIMESTAMP not null,
    memo TEXT not null,
    mcc INT,
    amount DECIMAL(16, 4),
    operation_amount DECIMAL(16, 4),
    operation_currency text,
    exchange_rate DECIMAL(16, 4),
    commission_amount DECIMAL(16, 4),
    cashback_amount DECIMAL(16, 4),
    balance_after DECIMAL(16, 4),
    checksum TEXT not null unique,
    created_at TIMESTAMP default current_timestamp,
    updated_at TIMESTAMP default current_timestamp
);

comment on column transaction_monobank.transaction_monobank_id is 'ID';

comment on column transaction_monobank.operation_date is 'Дата і час операції';

comment on column transaction_monobank.memo is 'Деталі операції';

comment on column transaction_monobank.mcc is 'Merchant Category Code (MCC) – код категорії продавця';

comment on column transaction_monobank.amount is 'Сума в валюті картки (UAH)';

comment on column transaction_monobank.operation_amount is 'Сума в валюті операції';

comment on column transaction_monobank.operation_currency is 'Валюта операції (наприклад, USD, EUR)';

comment on column transaction_monobank.exchange_rate is 'Курс обміну для конвертації у валюту картки';

comment on column transaction_monobank.commission_amount is 'Сума комісій (UAH)';

comment on column transaction_monobank.cashback_amount is 'Сума кешбеку (UAH)';

comment on column transaction_monobank.balance_after is 'Залишок після операції (UAH)';

comment on column transaction_monobank.checksum is 'Контрольна сума транзакції';

comment on column transaction_monobank.created_at is 'Дата створення запису';

comment on column transaction_monobank.updated_at is 'Дата останнього оновлення запису';

create trigger set_updated_at before
update on transaction_monobank for EACH row execute function update_timestamp();