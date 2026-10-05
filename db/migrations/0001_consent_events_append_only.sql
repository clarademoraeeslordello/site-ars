-- consent_events is the LGPD consent record: rows can be added, never changed or removed.
CREATE OR REPLACE FUNCTION consent_events_block_changes() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'consent_events is append-only (% blocked)', TG_OP;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER consent_events_no_update_delete
  BEFORE UPDATE OR DELETE ON consent_events
  FOR EACH ROW EXECUTE FUNCTION consent_events_block_changes();
--> statement-breakpoint
CREATE TRIGGER consent_events_no_truncate
  BEFORE TRUNCATE ON consent_events
  FOR EACH STATEMENT EXECUTE FUNCTION consent_events_block_changes();
