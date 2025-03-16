create or replace function update_timestamp() returns trigger as $$ begin NEW.updated_at = now();

return NEW;

end;

$$ LANGUAGE plpgsql;