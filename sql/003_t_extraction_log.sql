create table extraction_log (
    extraction_log_id SERIAL primary key,
    path TEXT not null,
    checksum TEXT not null unique,
    created_at TIMESTAMP default current_timestamp,
    updated_at TIMESTAMP default current_timestamp
);

create trigger set_updated_at before
update on extraction_log for EACH row execute function update_timestamp();